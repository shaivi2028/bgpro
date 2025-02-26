# BGPro - Background Remover

BGPro is a simple web application that allows users to remove the background from an image and a given choice of backgrounds select one and apply. The project consists of a Flask backend that processes the images and a React frontend that provides an interactive user interface.

---

## Features
- Upload an image and remove its background.
- Processed images are displayed.
- Simple user interface.

---

## Tech Stack
- **Frontend:** React.js
- **Backend:** Flask (Python)
- **Styling:** CSS
- **HTTP Requests:** Axios
- **Version Control:** Git & GitHub

---

## Installation & Setup
### Prerequisites
Ensure you have the following installed:
- Python (3.x)
- Node.js and npm
- Git

### 1. Clone the Repository
```sh
 git clone https://github.com/shaivi2028/bgpro.git
 cd bgpro
```

### 2. Setting Up Backend
```sh
 cd backend
 python -m venv venv  # Create a virtual environment
 venv\Scripts\activate  # Activate the virtual environment
 pip install -r requirements.txt  # Install dependencies
 python app.py  # Start Flask server
```

### 3. Setting Up Frontend
```sh
 cd frontend
 npm install  # Install dependencies
 npm start  # Start React server
```
This will run the React app at `http://localhost:3000/`.

---

## API Endpoints
### 1. **Upload Image (Remove Background)**
**Endpoint:**
```http
POST /upload
```
**Request:**
- Form-data with key `file` containing the image.

**Response:**
```json
{
  "message": "Image processed successfully",
  "processed_image": "static/processed_image.png"
}
```

### 2. **Apply Background**
**Endpoint:**
```http
POST /apply_background
```
**Request:**
```json
{
  "processed_image": "static/processed_image.png",
  "background": "static/backgrounds/bg1.jpg"
}
```
**Response:**
```json
{
  "final_image": "static/final_image.png"
}
```

---

## Challenges Faced
1. **Handling CORS Errors:** The frontend was initially blocked from making requests to the backend, which was fixed by enabling CORS in Flask.
2. **Fixing Submodule Issues in Git:** Accidentally adding the frontend folder as a submodule caused problems in tracking files correctly.
---

## Future Improvements
- **Drag-and-drop functionality for images.**
- **Better UI/UX with transitions.**
- **Dark mode toggle.**
- **Deployment to a cloud platform.**

---
