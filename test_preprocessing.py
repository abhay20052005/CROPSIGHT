import joblib
import numpy as np
import tensorflow as tf
from PIL import Image

def test_preprocessing():
    path = r"c:\Users\abhay\Desktop\project experi\ML_Model\mdl.pkl"
    model = joblib.load(path)
    
    # Create image of green color (similar to a leaf)
    img = Image.new('RGB', (160, 160), color='green')
    img_array = np.array(img, dtype=np.float32)
    
    # Preprocessing 1: MobileNetV2 standard [-1, 1]
    img1 = tf.keras.applications.mobilenet_v2.preprocess_input(np.copy(img_array))
    pred1 = model.predict(np.expand_dims(img1, axis=0))
    
    # Preprocessing 2: Scale [0, 1]
    img2 = np.copy(img_array) / 255.0
    pred2 = model.predict(np.expand_dims(img2, axis=0))
    
    # Preprocessing 3: No scaling [0, 255]
    img3 = np.copy(img_array)
    pred3 = model.predict(np.expand_dims(img3, axis=0))

    print("\n--- Predictions ---")
    print(f"Standard MobileNet [-1, 1] confidence max: {np.max(pred1):.4f}, argmax: {np.argmax(pred1)}")
    print(f"Scale [0, 1] confidence max: {np.max(pred2):.4f}, argmax: {np.argmax(pred2)}")
    print(f"Unscaled [0, 255] confidence max: {np.max(pred3):.4f}, argmax: {np.argmax(pred3)}")

if __name__ == "__main__":
    test_preprocessing()
