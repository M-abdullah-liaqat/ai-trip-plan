import axios from "axios";

let URL="https://places.googleapis.com/v1/places:searchText"

let config={
    headers:{
        "Content-Type": "application/json",
        "X-Goog-Api-Key": "AIzaSyDt7dLAuzd5YGX06S5574XlOzjo4z_3ii8",
        "X-Goog-FieldMask": [
           "places.displayName",
           "places.photos",
           "places.id"
        ]
    }
}

export const GetPlaceDetail=(data)=>axios.post(URL, data, config)