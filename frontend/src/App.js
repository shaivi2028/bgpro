import React, { useState } from "react";
import axios from "axios";

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [processedImage, setProcessedImage] = useState(null);
  const [selectedBackground, setSelectedBackground] = useState("");
  const [loading, setLoading] = useState(false);

  const backgrounds = [
    "background1.jpg",
    "background2.jpg",
    "background3.jpg",
  ];

  const [previewBackground, setPreviewBackground] = useState(null);
  const handlePreviewBackground = (bgFile) => {
    setPreviewBackground(bgFile);
  };
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select an image first!");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await axios.post("http://127.0.0.1:5000/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("Response Data:", response.data);
      setProcessedImage(response.data.processed_image);
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Failed to upload image.");
    } finally {
      setLoading(false);
    }
  };
  const handleApplyBackground = async () => {
    if (!processedImage || !selectedBackground) {
      alert("Please select a processed image and a background.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("http://127.0.0.1:5000/apply_background", {
        processed_image: processedImage,
        background: selectedBackground,
      });

      setProcessedImage(response.data.final_image);
    } catch (error) {
      console.error("Error applying background:", error);
      alert("Failed to apply background.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>BGPro - Background Remover</h1>
      <h4>Add the Image below</h4>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {/* <input type="file" accept="image/*" onChange={handleFileChange} /> */}
      <br />
      
      <button onClick={handleUpload} disabled={loading} style={{ margin: "10px" }}>
        {loading ? "Processing..." : "Upload Image"}
      </button>
      <br />
      
      {/* {processedImage && (
        <div>
          <h3>Processed Image:</h3>
          <img src={`http://127.0.0.1:5000/${processedImage}`} alt="Processed" width="300px" />
          
          <h3>Select a Background:</h3>
          {backgrounds.map((bg, index) => (
            <button
              key={index}
              onClick={() => setSelectedBackground(bg)}
              style={{ margin: "5px", padding: "10px", cursor: "pointer" }}
            >
              {bg}
            </button>
          ))} */}
      {processedImage && (
        <div className="image-container">
          <h3>Processed Image:</h3>
          <img src={`http://127.0.0.1:5000/${processedImage}`} alt="Processed" className="image-preview" />
          <h3>Select a Background:</h3>
          {backgrounds.map((bg, index) => (
            <button
              key={index}
              onClick={() => setSelectedBackground(bg)}
              style={{ margin: "5px", padding: "10px", cursor: "pointer" }}
            >
              {bg}
            </button>
          ))}


          
          {selectedBackground && (
            <div>
              <h3>Selected Background:</h3>
              <img src={`http://127.0.0.1:5000/static/backgrounds/${selectedBackground}`} alt="Background" width="300px" />
              <br />
              <button onClick={handleApplyBackground} disabled={loading}>
                {loading ? "Applying..." : "Apply Background"}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
