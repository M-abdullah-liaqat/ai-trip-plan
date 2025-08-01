import React from "react";
import { GetPlaceDetail } from "./getPlaceDetails";
import { useState, useEffect } from "react";
let DummyUrl = `https://places.googleapis.com/v1/{name}/media?max_height_px=600&max_width_px=600&key=${import.meta.env.VITE_GOOGLE_PLACE_API}`;

function Hotels({ hotel }) {
  const [Image, setImage] = useState("");
  const getPlaceimage = async (placeName) => {
    let dataSend = { textQuery: placeName };
    let resp = await GetPlaceDetail(dataSend).then((res) => {
      let finalURL = DummyUrl.replace(
        "{name}",
        res.data.places[0].photos[3].name
      );
      setImage(finalURL);
    });
  };
  useEffect(() => {
    getPlaceimage(hotel?.hotelName+" "+hotel?.address);
  }, [hotel]);
  return (
    <div className="hover:scale-103 transition-all">
      <div>
        <img
          className="w-[100%] rounded-xl 2xl:h-[350px] lg:h-[20vw] md:h-[30vw] h-[65vw] object-cover"
          src={Image? Image :"/New folder/4.png"}
          alt=""
        />
      </div>
      <div>
        <h2 className="text-xl font-semibold">{hotel.hotelName}</h2>
        <p>{hotel.details}</p>
        <p>{hotel?.address}</p>
        <p>Price: {hotel.price}</p>
      </div>
    </div>
  );
}

export default Hotels;
