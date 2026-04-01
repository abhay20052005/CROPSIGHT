import requests
import io
import numpy as np
from PIL import Image

def smoke_test():
    url = "http://127.0.0.1:8001/predict"
    print(f"Pinging AI Service at {url}...")
    
    # Create a dummy image
    img = Image.new('RGB', (160, 160), color = 'red')
    img_byte_arr = io.BytesIO()
    img.save(img_byte_arr, format='JPEG')
    img_byte_arr = img_byte_arr.getvalue()
    
    files = {'file': ('test.jpg', img_byte_arr, 'image/jpeg')}
    
    try:
        response = requests.post(url, files=files)
        if response.status_code == 200:
            print("SUCCESS: AI Model returned a diagnosis!")
            print(f"Result: {response.json()}")
        else:
            print(f"FAILED: AI Model returned status {response.status_code}")
            print(f"Error: {response.text}")
    except Exception as e:
        print(f"CONNECTION ERROR: {e}")

if __name__ == "__main__":
    smoke_test()
