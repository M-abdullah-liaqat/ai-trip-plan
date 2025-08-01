import React from "react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { MdPerson } from "react-icons/md";
import { redirect } from "react-router-dom";
import { useContext } from "react";
import { useUser } from "@/myconText/Context";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";


function NavbarLocal() {
  const { user, setUser } = useUser();
  console.log(user)
  const [UserData, setUserData] = useState(user  );
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
        localStorage.setItem("User", JSON.stringify(response.data));
        setUser(response.data)
        setOpendialog(false);
        setUserData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user info:", error);
      });
  };
  const [Opendialog, setOpendialog] = useState(false);
  return (
    <div
      className={`z-30 shadow-2xl sticky rounded-b-2xl top-0 w-[100%] bg-white flex justify-between items-center 2xl:px-45 xl:px-18 lg:px-12 px-6 py-3`}
    >
      <Link to={`/`}>
        <div className="Logo flex items-center gap-2">
          <img src="/logoBlack.svg" alt="" />
          <div className={`Jaro text-2xl text-black transition-all`}>
            Your Way
          </div>
        </div>
      </Link>
      <div>
        <ul className="flex items-center gap-4">
          <li className={UserData ? "block" : "hidden"}>
            <Link to={"/myTrips"}>
              <Button className="cursor-pointer">My trips</Button>
            </Link>
          </li>
          <li>
            {UserData ? (
              <Popover>
                <PopoverTrigger>
                  <div
                    className={` bg-black hover:bg-black/80 text-white cursor-pointer rounded-[10px] p-1`}
                  >
                    <MdPerson size={30} />
                  </div>
                </PopoverTrigger>
                <PopoverContent className="bg-neutral-700 text-white border-neutral-950">
                  <button
                  onClick={()=>{
                    localStorage.setItem("User", null)
                    setUser(null)
                    setUserData(null)
                  }}
                   className="py-1 px-5 border-neutral-950 rounded-lg cursor-pointer">Sign Out</button>
                </PopoverContent>
              </Popover>
            ) : (
              <Button
                onClick={() => setOpendialog(true)}
                className={` bg-black hover:bg-black/80 text-white cursor-pointer`}
              >
                Log in
              </Button>
            )}
          </li>
        </ul>
      </div>
      <Dialog open={Opendialog}>
        <DialogContent className="[&>button]:hidden">
          <DialogHeader>
            <DialogTitle>
              <div className="Logo flex items-center gap-2">
                <img src="/logoBlack.svg" alt="" />
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

export default NavbarLocal;
