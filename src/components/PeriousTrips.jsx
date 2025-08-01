import React from "react";
import { Link } from "react-router-dom";
import { useState,useEffect } from "react";
import { GetPlaceDetail } from "./getPlaceDetails";
let DummyUrl = `https://places.googleapis.com/v1/{name}/media?max_height_px=600&max_width_px=600&key=${import.meta.env.VITE_GOOGLE_PLACE_API}`;
function PeriousTrips({ item }) {
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
    getPlaceimage(item.data.tripData?.tripData.tripPlan?.destination);
  }, [item]);

  return (
    <Link to={`/trips/${item.docID}`}>
      {" "}
      <div className="hover:scale-103 transition-all">
        <div>
          <img
            className="w-[100%] rounded-xl 2xl:h-[320px] xl:h-[20vw] md:h-[26vw] h-[40vw] object-cover"
           src={Image? Image : "/New folder/4.png"}
            alt=""
          />
        </div>
        <div>
          <h2 className="md:text-xl text-lg font-semibold">
            {item.data.tripData?.tripData.tripPlan?.destination}
          </h2>
        </div>
      </div>
    </Link>
  );
}

export default PeriousTrips;
