import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import GeoapifyAutocomplete from "@/components/autocomplete";
import { GenerateDetail } from "@/components/ai-plan";
import { doc, setDoc } from "firebase/firestore";
import { DBUsing } from "@/components/FireSotre";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useUser } from "@/myconText/Context";
import AutocompleteExample from "@/components/AutoCompete";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// import { db } from "@/components/FireSotre";
const images = [
  { image: "cash1.png", title: "Cheap" },
  { image: "cash2.png", title: "Moderate" },
  { image: "cash3.png", title: "Luxury" },
];
const alongWith = [
  { image: "alone.png", title: "Alone" },
  { image: "family.png", title: "Family" },
  { image: "firends.png", title: "Friends" },
];
function Generator() {
  const [Opendialog, setOpendialog] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [Budget, setBudget] = useState("");
  const [Along, setAlong] = useState("");
  const [Days, setdDays] = useState(0);
  const [location, setlocation] = useState("");
  const navigate = useNavigate();
  const { user, setUser } = useUser();
  const [UserData, setUserData] = useState(user);
  const LoginToGoogle = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      onlogin(tokenResponse);
    },
    onError: (error) => {
      console.error("Login failed:", error);
    },
  });
  const onlogin = (TOkeInfo) => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${TOkeInfo.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${TOkeInfo.access_token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log("User Info:", response.data);
        localStorage.setItem("User", JSON.stringify(response.data));
        setOpendialog(false);
        setUserData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user info:", error);
      });
  };
  const handleGenerate = async () => {
    setisLoading(true);
    if (!Budget || !Along || !location || !Days || Days <= 0) {
      toast("Please Fill all fields correctly");
      setisLoading(false);
      return;
    }
    const data = {
      budget: Budget,
      alongWith: Along,
      location: location,
    };
    const readymade = `Generate a trip plan for location: ${location} for ${Days} days for a ${Along} with ${Budget} budget, Give me Hotels options list with valid hotel name, hotel address, price, Hotel Image URL,  Geo coordinates , rating, details and suggest itinerary with place name, place details, place image URL, GEO coordinates ticket pricing, Time to travel each of location for ${Days} days with each day plan, with best time to visit in JSON format`;
    await GenerateDetail(readymade)
      .then(async (response) => {
        let res = await JSON.parse(response);
        console.log("Generated trip plan:", res);
        let tempID = Date.now().toString();
        await setDoc(doc(DBUsing, "TripPlanner", tempID), {
          tripData: res,
          userEmail: UserData.email,
        });
        setisLoading(false);
        navigate("/trips/" + tempID);
      })
      .catch((error) => {
        console.error("Error generating trip plan:", error);
      });
    setisLoading(false);
  };
  return (
    <div>
      <div className="w-[100%] h-[600px] relative">
        <img
          className="w-[100%] h-[100%] object-cover object-bottom-left"
          src="New folder/2.png"
          alt=""
        />
        <div className="w-[100%] h-[100%] bg-black/40 absolute top-0 flex flex-col items-center justify-center gap-8 px-4">
          <div className="2xl:w-[50%] md:w-[70%] oswald xl:text-7xl text-5xl z-30 text-white font-bold text-center">
            Tell us your travel preferances
          </div>
          <div className="2xl:w-[50%] md:w-[70%] oswald xl:text-5xl text-3xl z-30 text-white font-bold text-center">
            We will Plan a full trip for you
          </div>
        </div>
      </div>
      <div className="xl:w-[1280px] w-[100%] justify-self-center my-10 px-6">
        <div className="flex flex-col gap-10">
          <div className="text-3xl font-bold ">Generate your trip</div>
          <div className="flex flex-col gap-2">
            <Label className="text-xl font-medium">Wehere You want to go</Label>
            <GeoapifyAutocomplete
              onSelectLocation={(loc) => setlocation(loc)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label className="text-xl font-medium">
              How many days yor are plaining your trip
            </Label>
            <Input
              value={Days}
              onChange={(e) => setdDays(e.target.value)}
              type={"number"}
              className="w-[100%] h-[50px] rounded-lg border-2 border-gray-400 focus:border-blue-500 focus:outline-none p-2"
              placeholder="Enter your destination"
            />
          </div>
          <div className="flex flex-col gap-2">
            <div className="text-xl font-medium">What&#39;s you budget</div>
            <div>
              <div className="grid grid-cols-3 gap-4">
                {images.map((item, index) => (
                  <div
                    onClick={() => setBudget(item.title)}
                    key={index}
                    className={`md:h-[200px] h-[150px] rounded-xl flex flex-col border-2 ${
                      Budget === item.title
                        ? "border-slate-800 bg-slate-200"
                        : "border-slate-400 bg-slate-100"
                    }    items-center justify-center gap-2 cursor-pointer hover:scale-105 transition-all`}
                  >
                    <img
                      src={item.image}
                      className="md:w-[80px] w-[60px]"
                      alt=""
                    />
                    <div className="text-lg font-medium">{item.title}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="text-xl font-medium">What&#39;s you budget</div>
            <div>
              <div className="grid grid-cols-3 gap-4">
                {alongWith.map((item, index) => (
                  <div
                    onClick={() => setAlong(item.title)}
                    key={index}
                    className={`md:h-[200px] h-[150px] rounded-xl flex flex-col border-2 ${
                      Along === item.title
                        ? "border-slate-800 bg-slate-200"
                        : "border-slate-400 bg-slate-100"
                    }    items-center justify-center gap-2 cursor-pointer hover:scale-105 transition-all`}
                  >
                    <img
                      src={item.image}
                      className="md:w-[80px] w-[60px] "
                      alt=""
                    />
                    <div className="text-lg font-medium">{item.title}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex items-center justify-end">
            <Button
              disabled={isLoading}
              onClick={() => {
                UserData ? handleGenerate() : setOpendialog(true);
              }}
              className={`cursor-pointer`}
            >
              {isLoading ? (
                <>
                  <AiOutlineLoading3Quarters className="animate-spin" />
                  Generating...
                </>
              ) : (
                "Generate"
              )}
            </Button>
          </div>
        </div>
      </div>
      <Dialog open={Opendialog}>
        <DialogContent className="[&>button]:hidden">
          <DialogHeader>
            <DialogTitle>
              <div className="Logo flex items-center gap-2">
                <img src="logoBlack.svg" alt="" />
                <div className={`Jaro text-2xl text-black transition-all`}>
                  Your Way
                </div>
              </div>
            </DialogTitle>
            <DialogDescription>
              <div className="flex flex-col gap-4 my-2 mt-6">
                <Button onClick={() => LoginToGoogle()}>
                  Continue with Google
                </Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Generator;
