import joblib
import os
import tensorflow as tf

def check_mdl():
    path = r"c:\Users\abhay\Desktop\project experi\ML_Model\mdl.pkl"
    print(f"Checking '{path}'...")
    m = joblib.load(path)
    
    # Check output shape
    out_shape = m.output_shape
    print(f"Full Output Shape: {out_shape}")
    
    # Last dimension
    num_classes = out_shape[-1]
    print(f"Num classes / Output nodes: {num_classes}")
    
    # Check layer names again
    print(f"Last 5 layers: {[l.name for l in m.layers][-5:]}")
    
    # Try a dummy prediction
    import numpy as np
    dummy = np.zeros((1, 160, 160, 3), dtype=np.float32)
    print("Testing dummy prediction...")
    try:
        preds = m.predict(dummy)
        print(f"Prediction success! Shape: {preds.shape}")
        print(f"Preds[0] length: {len(preds[0])}")
    except Exception as e:
        import traceback
        print(f"Prediction FAILED: {e}")
        traceback.print_exc()

if __name__ == "__main__":
    check_mdl()
