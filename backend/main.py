from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import easyocr, numpy as np
from PIL import Image
import io

# Initialize the FastAPI application
app = FastAPI()

# Enable CORS to allow requests from the frontend (port 3000)
app.add_middleware(
    CORSMiddleware,
    # The origin of the frontend application
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)

# Initialize the EasyOCR Reader
# 'it' and 'en' are the languages to be recognized
# gpu=False indicates that the CPU will be used instead of the GPU
reader = easyocr.Reader(['it','en'], gpu=False)

# Define the POST endpoint for OCR text parsing
# It accepts an uploaded file
@app.post("/ocr/parse")
async def parse(file: UploadFile = File(...)):
    # Read the content of the uploaded file
    file_content = await file.read()
    
    # Open the image using PIL from the bytes and convert it to RGB format
    img = Image.open(io.BytesIO(file_content)).convert("RGB")
    
    # Perform OCR using EasyOCR on the image (converted to a NumPy array)
    # 'result' contains a list of tuples: (bounding box, recognized text, confidence)
    result = reader.readtext(np.array(img))
    
    # Extract only the recognized text from the results and join them with a newline character
    text = "\n".join([t[1] for t in result])
    
    # Return the extracted text as a JSON object
    return {"text": text}