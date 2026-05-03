import os
import shutil
from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import traceback
from ai import measurements

app = FastAPI(title="PerfectFit AI API")

# Allow CORS for Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@app.post("/api/measure")
async def measure_image(file: UploadFile = File(...)):
    try:
        # Save the uploaded file temporarily
        file_path = os.path.join(UPLOAD_DIR, file.filename)
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
        
        # Process the image
        data, size, scale = measurements(file_path)
        
        # Clean up
        try:
            os.remove(file_path)
        except Exception as e:
            print(f"Failed to remove temp file: {e}")
            
        return {
            "success": True,
            "measurements": data,
            "recommended_size": size,
            "scale_cm_per_px": scale
        }
        
    except RuntimeError as e:
        # Calibration or other known errors
        raise HTTPException(status_code=400, detail=str(e))
    except ValueError as e:
        # Visibility or other validation errors
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        print(traceback.format_exc())
        raise HTTPException(status_code=500, detail=f"Internal Server Error: {str(e)}")

@app.get("/api/health")
def health_check():
    return {"status": "ok"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
