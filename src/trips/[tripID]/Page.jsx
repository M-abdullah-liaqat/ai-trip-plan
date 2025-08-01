import React from "react";
import { useParams } from "react-router-dom";
import { DBUsing } from "@/components/FireSotre";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { GetPlaceDetail } from "@/components/getPlaceDetails";
import Places from "@/components/Places";
import Hotels from "@/components/Hotels";
import { useUser } from "@/myconText/Context";
let DummyUrl = `https://places.googleapis.com/v1/{name}/media?max_height_px=1000&max_width_px=1400&key=${import.meta.env.VITE_GOOGLE_PLACE_API}`;

function Page() {
  const { tripID } = useParams();
  const [Trip, setTrip] = useState();
  const [Image, setImage] = useState("");
  const { user, setUser } = useUser();
  const [UserData, setUserData] = useState(user);
  const docRef = doc(DBUsing, "TripPlanner", tripID);
  const docsnap = getDoc(docRef);
  useEffect(() => {
    const fetchData = async () => {
      const docSnap = await docsnap;
      if (docSnap.exists()) {
        setTrip(docSnap.data());
        getPlaceimage(docSnap.data().tripData?.tripData?.tripPlan?.destination);
      } else {
        console.log("No such document!");
      }
    };
    fetchData();
  }, [tripID]);
  const getPlaceimage = async (placeName) => {
    let dataSend = { textQuery: placeName };
    let resp = await GetPlaceDetail(dataSend).then((res) => {
      console.log(res.data.places[0].photos)
      let finalURL = DummyUrl.replace(
        "{name}",
        res.data.places[0].photos[2].name
      );
      setImage(finalURL);
    });
  };
  // if(Trip?.userEmail !== UserData?.email) {
  //   return (
  //     <div className="flex items-center justify-center h-screen">
  //       <h1 className="text-2xl font-bold">You are not authorized to view this page.</h1>
  //     </div>
  //   );
  // }
  return (
    <div className="min-h-[92vh]">
      <div className="w-[100%] h-[900px] relative">
        <img
          className="w-[100%] h-[100%] object-cover"
          src={Image ? Image:  `/New folder/2.png`}
          alt=""
        />
        <div className="w-[100%] h-[100%] bg-black/40 absolute top-0 flex flex-col items-center justify-center gap-8 px-4">
          <div className="2xl:w-[50%] md:w-[70%] oswald xl:text-7xl text-5xl z-30 text-white font-bold text-center">
            {Trip && Trip.tripData?.tripData.tripPlan?.destination}
          </div>
        </div>
      </div>
      <div className="2xl:w-[1532px] w-[100%] justify-self-center my-10 px-6">
        <div>
          <div className="text-2xl font-bold ">Recommended Hotels</div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:gap-[16px] lg:gap-[2vw] md:gap-[2vw] gap-[20px] my-5">
            {Trip &&
              Trip.tripData?.tripData?.tripPlan?.hotels?.map((hotel, index) => {
                return <Hotels key={index} hotel={hotel} />;
              })}
          </div>
        </div>
        <div>
          <div className="text-2xl font-bold py-2">Recommended Places</div>
          {Trip &&
            Trip.tripData?.tripData?.tripPlan?.itinerary?.map((day, ind) => {
              return (
                <div key={ind}>
                  <div className="text-2xl font-medium ">{day.day}</div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 2xl:gap-[16px] lg:gap-[2vw] md:gap-[2vw] gap-[20px] my-5">
                    {day &&
                      day.plan?.map((hotel, index) => {
                        return <Places key={index} Trip={hotel} />;
                      })}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default Page;
