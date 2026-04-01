import joblib
import tensorflow as tf
import os

def test_load():
    path = r"c:\Users\abhay\Desktop\project experi\ML_Model\model.pkl"
    print(f"Loading '{path}'...")
    try:
        model = joblib.load(path)
        print(f"SUCCESS: Model loaded. Type: {type(model)}")
        if hasattr(model, 'input_shape'):
            print(f"Input Shape: {model.input_shape}")
    except Exception as e:
        print(f"ERROR: {e}")

if __name__ == "__main__":
    test_load()
