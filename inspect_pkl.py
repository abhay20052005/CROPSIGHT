import pickle
import joblib
import os

def inspect_pkl(path):
    print(f"Inspecting '{path}'...")
    try:
        # Try joblib first (common for scikit-learn)
        model = joblib.load(path)
        print(f"Loaded with joblib: {type(model)}")
        if hasattr(model, 'classes_'):
            print(f"Classes: {model.classes_}")
    except Exception as e:
        print(f"Joblib failed: {e}")
        try:
            with open(path, 'rb') as f:
                model = pickle.load(f)
            print(f"Loaded with pickle: {type(model)}")
        except Exception as e2:
            print(f"Pickle failed: {e2}")

if __name__ == "__main__":
    inspect_pkl(r"c:\Users\abhay\Desktop\project experi\ML_Model\model.pkl")
