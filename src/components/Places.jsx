import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GetPlaceDetail } from "./getPlaceDetails";
import axios from "axios";
let DummyUrl = `https://places.googleapis.com/v1/{name}/media?max_height_px=600&max_width_px=600&key=${import.meta.env.VITE_GOOGLE_PLACE_API}`;
function Places({ Trip }) {
  const [Image, setImage] = useState("");
  const getPlaceimage = async (placeName) => {
    let dataSend = { textQuery: placeName };
    let resp = await GetPlaceDetail(dataSend).then((res)=>{
        let finalURL= DummyUrl.replace("{name}", res.data.places[0].photos[3].name)
        setImage(finalURL)
    })
  };
  useEffect(() => {
    getPlaceimage(Trip?.placeName)
  }, [Trip]);

  return (
    <div
      className=" md:py-5 py-2 hover:scale-103 transition-all md:px-5 px-2 grid md:grid-cols-[1fr_2fr] grid-cols-[1fr_1fr] gap-5 border-2 rounded-lg cursor-pointer"
    >
      <div className="flex items-center justify-center">
        <img
          className="w-[100%] 2xl:h-[200px] lg:h-[12vw] h-[25vw] rounded-xl object-cover"
          src={Image? Image : "/New folder/4.png"}
          alt=""
        />
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="md:text-xl font-semibold">{Trip.placeName}</h2>
        <div className="md:text-[16px] text-[13px]">
          <p>{Trip.placeDetails}</p>
          <p>TravelTime: {Trip.travelTime}</p>
          <p>Ticket Price: {Trip.ticketPricing}</p>
        </div>
      </div>
    </div>
  );
}

export default Places;
