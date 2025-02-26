import requests
import os

REMOVE_BG_API_KEY = "zJfZdKwpQvZ8n5f556qRpq1z"

def remove_background(image_path):
    print(f"Removing background for {image_path}")  # Debug log
    
    with open(image_path, "rb") as file:
        response = requests.post(
            "https://api.remove.bg/v1.0/removebg",
            files={"image_file": file},
            data={"size": "auto"},
            headers={"X-Api-Key": REMOVE_BG_API_KEY}
        )

    if response.status_code == 200:
        output_path = image_path.replace(".jpg", "_no_bg.png")
        with open(output_path, "wb") as out:
            out.write(response.content)
        print(f"Processed image saved at {output_path}")  # Debug log
        return output_path
    else:
        print(f"Error in background removal: {response.text}")  # Debug log
        return None
