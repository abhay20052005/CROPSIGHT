import os
import sys

os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'  # Suppress TF logging
class SafeStdout:
    def __init__(self, original):
        self.original = original
    def write(self, msg):
        if self.original:
            try: self.original.write(msg)
            except OSError: pass
    def flush(self):
        if self.original:
            try: self.original.flush()
            except OSError: pass

sys.stdout = SafeStdout(sys.stdout)
sys.stderr = SafeStdout(sys.stderr)

import io
import joblib
import numpy as np
import tensorflow as tf
from flask import Flask, request, jsonify
from flask_cors import CORS
from PIL import Image

# --- App Setup ---
app = Flask(__name__)
CORS(app)

# --- Configuration ---
# Absolute path to the model file
MODEL_PATH = r"c:\Users\abhay\Desktop\project experi\ML_Model\mdl.pkl"
IMG_SIZE = (160, 160)

# 39 Class names from the Plant Disease dataset (original order from the user's codebase)
CLASS_NAMES = [
    "Apple___Apple_scab", "Apple___Black_rot", "Apple___Cedar_apple_rust", "Apple___healthy",
    "Blueberry___healthy", "Cherry_(including_sour)___Powdery_mildew", "Cherry_(including_sour)___healthy",
    "Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot", "Corn_(maize)___Common_rust_",
    "Corn_(maize)___Northern_Leaf_Blight", "Corn_(maize)___healthy", "Grape___Black_rot",
    "Grape___Esca_(Black_Measles)", "Grape___Leaf_blight_(Isariopsis_Leaf_Spot)", "Grape___healthy",
    "Orange___Haunglongbing_(Citrus_greening)", "Peach___Bacterial_spot", "Peach___healthy",
    "Pepper,_bell___Bacterial_spot", "Pepper,_bell___healthy", "Potato___Early_blight",
    "Potato___Late_blight", "Potato___healthy", "Raspberry___healthy", "Soybean___healthy",
    "Squash___Powdery_mildew", "Strawberry___Leaf_scorch", "Strawberry___healthy",
    "Tomato___Bacterial_spot", "Tomato___Early_blight", "Tomato___Late_blight", "Tomato___Leaf_Mold",
    "Tomato___Septoria_leaf_spot", "Tomato___Spider_mites Two-spotted_spider_mite",
    "Tomato___Target_Spot", "Tomato___Tomato_Yellow_Leaf_Curl_Virus", "Tomato___Tomato_mosaic_virus",
    "Tomato___healthy", "Background_without_leaves"
]

TREATMENTS = {
    "Apple___Apple_scab": "Apply fungicide (captan or myclobutanil) during early spring. Remove fallen infected leaves.",
    "Apple___Black_rot": "Prune dead or infected branches. Apply fungicide during bloom period.",
    "Apple___Cedar_apple_rust": "Remove nearby juniper trees. Apply fungicide in spring.",
    "Apple___healthy": "Continue current care routine. Ensure adequate watering and sunlight.",
    "Blueberry___healthy": "Continue current care routine. Maintain acidic soil pH (4.5-5.5).",
    "Cherry_(including_sour)___Powdery_mildew": "Apply sulfur-based fungicide. Improve air circulation by pruning.",
    "Cherry_(including_sour)___healthy": "Continue current care routine. Regular watering and balanced nutrition.",
    "Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot": "Apply foliar fungicide. Rotate crops yearly. Use resistant hybrids.",
    "Corn_(maize)___Common_rust_": "Apply fungicide if detected early. Plant resistant varieties next season.",
    "Corn_(maize)___Northern_Leaf_Blight": "Apply foliar fungicide at first sign. Practice crop rotation.",
    "Corn_(maize)___healthy": "Continue current care routine. Ensure proper spacing and nitrogen supply.",
    "Grape___Black_rot": "Apply fungicide early in the season. Remove mummified berries and infected canes.",
    "Grape___Esca_(Black_Measles)": "Prune infected wood in dry weather. No chemical cure exists.",
    "Grape___Leaf_blight_(Isariopsis_Leaf_Spot)": "Apply copper-based fungicide. Remove infected leaves promptly.",
    "Grape___healthy": "Continue current care routine. Ensure good air circulation.",
    "Orange___Haunglongbing_(Citrus_greening)": "No cure available. Control Asian citrus psyllid vectors. Remove infected trees.",
    "Peach___Bacterial_spot": "Apply copper sprays. Avoid overhead irrigation.",
    "Peach___healthy": "Continue current care routine. Prune annually for airflow.",
    "Pepper,_bell___Bacterial_spot": "Apply copper-based bactericide. Use disease-free seeds.",
    "Pepper,_bell___healthy": "Continue current care routine. Maintain consistent watering.",
    "Potato___Early_blight": "Apply chlorothalonil or mancozeb fungicide.",
    "Potato___Late_blight": "Apply metalaxyl or chlorothalonil immediately.",
    "Potato___healthy": "Continue current care routine. Hill soil around plants regularly.",
    "Raspberry___healthy": "Continue current care routine. Prune out old canes.",
    "Soybean___healthy": "Continue current care routine. Keep fields weed-free.",
    "Squash___Powdery_mildew": "Improve air circulation. Apply potassium bicarbonate sprays.",
    "Strawberry___Leaf_scorch": "Remove infected leaves. Apply fungicide after harvest.",
    "Strawberry___healthy": "Continue current care routine. Maintain proper spacing.",
    "Tomato___Bacterial_spot": "Apply copper fungicide. Avoid handleing wet plants.",
    "Tomato___Early_blight": "Prune lower leaves to improve airflow. Apply fungicide weekly.",
    "Tomato___Late_blight": "Apply copper-based fungicide. Remove and destroy infected plants immediately.",
    "Tomato___Leaf_Mold": "Improve greenhouse ventilation. Avoid overhead irrigation.",
    "Tomato___Septoria_leaf_spot": "Remove infected bottom leaves. Rotate crops every 2-3 years.",
    "Tomato___Spider_mites Two-spotted_spider_mite": "Spray with insecticidal soap or neem oil.",
    "Tomato___Target_Spot": "Apply protectant fungicide (chlorothalonil).",
    "Tomato___Tomato_Yellow_Leaf_Curl_Virus": "Control whitefly population. Use row covers.",
    "Tomato___Tomato_mosaic_virus": "Destroy infected plants. Do not touch healthy plants after touching smokers/tobacco.",
    "Tomato___healthy": "Continue current care routine. Use balanced fertilizer.",
    "Background_without_leaves": "No plant detected. Please try scanning a leaf."
}

# --- Model Loading ---
model = None
try:
    print(f"Loading model from {MODEL_PATH}...")
    model = joblib.load(MODEL_PATH)
    print("SUCCESS: Model loaded successfully.")
except Exception as e:
    print(f"CRITICAL ERROR: Failed to load model: {e}")

# --- Helper Functions ---
def format_class_name(raw_name: str) -> str:
    parts = raw_name.split("___")
    if len(parts) == 2:
        crop = parts[0].replace("_", " ").title()
        disease = parts[1].replace("_", " ").title()
        return f"{crop} - {disease}"
    return raw_name.replace("_", " ").title()

def preprocess_image(image_bytes: bytes) -> np.ndarray:
    img = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    img = img.resize(IMG_SIZE)
    img_array = np.array(img, dtype=np.float32)
    # Standard MobileNetV2 preprocessing
    img_array = tf.keras.applications.mobilenet_v2.preprocess_input(img_array)
    return np.expand_dims(img_array, axis=0)

# --- Routes ---
@app.route("/", methods=["GET"])
def index():
    return jsonify({"status": "running", "model_loaded": model is not None})

@app.route("/predict", methods=["POST"])
def predict():
    if model is None:
        return jsonify({"error": "Model not loaded"}), 500
    
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400
    
    try:
        file = request.files["file"]
        img_bytes = file.read()
        processed_img = preprocess_image(img_bytes)
        
        predictions = model.predict(processed_img, verbose=0)
        
        preds_flat = predictions[0]
        predicted_idx = int(np.argmax(preds_flat))
        confidence = float(np.max(preds_flat)) * 100
        
        raw_class = CLASS_NAMES[predicted_idx]
        display_name = format_class_name(raw_class)
        treatment = TREATMENTS.get(raw_class, "Consult an expert for diagnosis.")
        
        # Get top predictions for dashboard
        top_indices = np.argsort(predictions[0])[-3:][::-1]
        top_preds = [
            {
                "disease": format_class_name(CLASS_NAMES[i]),
                "confidence": round(float(predictions[0][i]) * 100, 2)
            }
            for i in top_indices
        ]
        
        return jsonify({
            "disease": display_name,
            "disease_raw": raw_class,
            "confidence": round(confidence, 2),
            "treatment": treatment,
            "top_predictions": top_preds,
            "crop_type": raw_class.split("___")[0].replace("_", " ") if "___" in raw_class else "Unknown",
            "is_healthy": "healthy" in raw_class.lower()
        })
        
    except Exception as e:
        import traceback
        traceback.print_exc()
        print(f"Prediction Error: {e}")
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    print("Starting Flask AI Service on port 8001...")
    app.run(host="0.0.0.0", port=8001)
