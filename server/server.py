import uvicorn
from fastapi import FastAPI
import utils
from utils import House
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://127.0.0.1:5500"],  # Adjust this to your frontend origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get('/get_location_names')
def get_location_names():
    utils.load_saved_artifacts()
    response = {
        'locations' : utils.get_location_names()
    }
    return response

@app.post('/predict_home_price')
def predict_home_price(data:House):
    total_sqft = data.total_sqft
    location = data.location
    bhk = data.bhk
    bath = data.bath
    response = {
        'estimated_price' : utils.get_estimated_price(location, total_sqft, bhk, bath)
    }

    return response
    

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)
    #print(get_location_names())
    
    
