from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import cv2
from remove_bg import remove_background

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = "static"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
@app.route("/", methods=["GET"])
def home():
    return jsonify({"message": "Welcome to bgpro API! Use /upload (POST) to upload an image."})

@app.route("/upload", methods=["POST"])
def upload_image():
    print("Request received at /upload")  # Debug log

    # Check if a file is provided
    if "file" not in request.files:
        print("No file found in request")  # Debug log
        return jsonify({"error": "No file provided"}), 400

    file = request.files["file"]
    if file.filename == "":
        print("No file selected")  # Debug log
        return jsonify({"error": "No selected file"}), 400

    file_path = os.path.join(UPLOAD_FOLDER, file.filename)
    file.save(file_path)
    print(f"File saved at {file_path}")  # Debug log

    processed_path = remove_background(file_path)
    print(f"Processed image saved at {processed_path}")  # Debug log

    return jsonify({"message": "Image processed successfully", "processed_image": processed_path})

@app.route("/apply_background", methods=["POST"])
def apply_background():
    data = request.json
    processed_image_path = data.get("processed_image")
    background_path = os.path.join("static/backgrounds", data.get("background"))

    if not os.path.exists(processed_image_path):
        return jsonify({"error": "Processed image not found"}), 400
    if not os.path.exists(background_path):
        return jsonify({"error": "Background image not found"}), 400

    # Load images
    foreground = cv2.imread(processed_image_path, cv2.IMREAD_UNCHANGED)  # Preserve transparency
    background = cv2.imread(background_path, cv2.IMREAD_COLOR)  # Load background as normal color image

    # Resize background to match foreground
    background = cv2.resize(background, (foreground.shape[1], foreground.shape[0]))

    # Ensure foreground has an alpha channel (RGBA)
    if foreground.shape[-1] == 3:
        foreground = cv2.cvtColor(foreground, cv2.COLOR_BGR2BGRA)

    # Extract the alpha channel (transparency)
    alpha_channel = foreground[:, :, 3] / 255.0  # Normalize to 0-1 range

    # Blend images using alpha channel
    for c in range(0, 3):  # Iterate over RGB channels
        background[:, :, c] = (1 - alpha_channel) * background[:, :, c] + alpha_channel * foreground[:, :, c]

    # Save final image
    final_image_path = processed_image_path.replace("_no_bg.png", "_final.png")
    cv2.imwrite(final_image_path, background)

    return jsonify({"message": "Background applied successfully", "final_image": final_image_path})

if __name__ == "__main__":
    app.run(debug=True)

