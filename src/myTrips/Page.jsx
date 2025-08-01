import React from "react";
import { collection, where, query, getDocs } from "firebase/firestore";
import { DBUsing } from "@/components/FireSotre";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { GetPlaceDetail } from "@/components/getPlaceDetails";
import PeriousTrips from "@/components/PeriousTrips";
import { useUser } from "@/myconText/Context";
function Page() {
  const [Image, setImage] = useState("");
  const { user, setUser } = useUser();
  const [UserData, setUserData] = useState(user);
  const navigate = useNavigate();
  const [AllTrips, setAllTrips] = useState([]);
  const getDocarea = async () => {
    let que = query(
      collection(DBUsing, "TripPlanner"),
      where("userEmail", "==", UserData.email)
    );
    const querySnapshot = await getDocs(que);
    let dummyarray=[];
    querySnapshot.forEach((doc) => {
      dummyarray.push({ docID: doc.id, data: doc.data() })
    });
    let another=[]
    for(let i=dummyarray.length-1; i>=0; i--){
      another.push(dummyarray[i])
    }
    setAllTrips(another)
  };
  useEffect(() => {
    if (UserData) {
      getDocarea();
    } else {
      navigate("/");
    }
  }, [UserData]);
  const dummyArray = [1, 2, 3, 4, 5, 6,7,8,9,10,1,2];
  if (AllTrips.length==0) {
    return (
      <div className="min-h-[90vh] 2xl:w-[1532px] w-[100%] justify-self-center">
        <div className="text-2xl font-semibold my-10 px-5">
          My previous Trips
        </div>
        <div className="w-[100%] grid xl:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-[20px] justify-self-center mb-10 px-5">
          {dummyArray &&
            dummyArray.map((item, index) => {
              return (
                <div key={index} className="hover:scale-103 transition-all">
                  <div className="w-[100%] rounded-xl 2xl:h-[320px] xl:h-[20vw] md:h-[26vw] h-[40vw] object-cover bg-slate-300">
                  </div>
                  <div className="w-[70%] h-5 mt-3 rounded-xl bg-slate-300">
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-[90vh] 2xl:w-[1532px] w-[100%] justify-self-center">
      <div className="text-2xl font-semibold my-10 px-5">My previous Trips</div>
      <div className="w-[100%] grid xl:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-[20px] justify-self-center mb-10 px-5">
        {AllTrips &&
          AllTrips.map((item, index) => {
            return <PeriousTrips key={index} item={item} />;
          })}
      </div>
    </div>
  );
}

export default Page;
