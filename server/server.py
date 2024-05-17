from fastapi import FastAPI
from fastapi.responses import JSONResponse
import util
import uvicorn

app = FastAPI()

@app.get("/")
async def root():
    return 100


@app.get('/get_location_names')
async def get_location_names():
    return "asdfasdf"

"""
@app.post('/predict_home_price')
async def predict_home_price():
    total_sqft = float(request.total_sqft)
    location = float(request.location)
    bhk = float(request.bhk)
    bath = float(request.bath)
"""


if __name__ == "__main__":
    uvicorn.run(app, host="localhost", port=8000)
    
    
