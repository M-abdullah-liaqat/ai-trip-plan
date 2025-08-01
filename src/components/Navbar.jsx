import React from "react";
import { useRef, useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import { useLocation } from "react-router-dom";
import { useUser } from "@/myconText/Context";
import { MdPerson } from "react-icons/md";
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

function Navbar() {
  const { user, setUser } = useUser();
  const [UserData, setUserData] = useState(user);
  const [Opendialog, setOpendialog] = useState(false);
  const location = useLocation();
  const URLS = ["/generator"];
  const [currentPathname, setcurrentPathname] = useState(location.pathname);
  console.log(currentPathname);
  const dec = URLS.includes(location.pathname);
  console.log(dec);
  useEffect(() => {
    setcurrentPathname(window.location.pathname);
  }, [currentPathname]);
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
        setUser(response.data);
        setOpendialog(false);
        setUserData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user info:", error);
      });
  };
  const NavColor = useRef();
  const ButtColor = useRef();
  const ButtColor2 = useRef();
  const LogoColor = useRef();
  const Logo = useRef();
  if (typeof window !== "undefined" && location.pathname==="/") {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 0) {
        ButtColor.current.classList.remove("text-black");
        ButtColor.current.classList.add("text-white");
        ButtColor.current.classList.remove("bg-white");
        ButtColor.current.classList.add("bg-black");
        ButtColor.current.classList.remove("hover:bg-white/80");
        ButtColor.current.classList.add("hover:bg-black/80");
        ButtColor2.current.classList.remove("text-black");
        ButtColor2.current.classList.add("text-white");
        ButtColor2.current.classList.remove("bg-white");
        ButtColor2.current.classList.add("bg-black");
        ButtColor2.current.classList.remove("hover:bg-white/80");
        ButtColor2.current.classList.add("hover:bg-black/80");
        LogoColor.current.classList.remove("text-white");
        LogoColor.current.classList.add("text-black");
        Logo.current.src = "logoBlack.svg";
        NavColor.current.classList.add("bg-white/80");
      } else {
        NavColor.current.classList.remove("bg-white/80");
        ButtColor.current.classList.remove("text-white");
        ButtColor.current.classList.add("text-black");
        ButtColor.current.classList.remove("bg-black");
        ButtColor.current.classList.add("bg-white");
        ButtColor2.current.classList.remove("text-white");
        ButtColor2.current.classList.add("text-black");
        ButtColor2.current.classList.remove("bg-black");
        ButtColor2.current.classList.add("bg-white");
        LogoColor.current.classList.remove("text-black");
        LogoColor.current.classList.add("text-white");
        ButtColor.current.classList.remove("hover:bg-black/80");
        ButtColor.current.classList.add("hover:bg-white/80");
        ButtColor2.current.classList.remove("hover:bg-black/80");
        ButtColor2.current.classList.add("hover:bg-white/80");
        Logo.current.src = "logoWhite.svg";
      }
    });
  }

  return (
    <div
      ref={NavColor}
      className={`z-30 shadow-2xl fixed ${
        dec ? "hidden" : "block"
      } rounded-b-2xl top-0 w-[100%] flex justify-between items-center 2xl:px-45 xl:px-18 lg:px-12 px-6 py-3`}
    >
      <Link to={`/`}>
        <div className="Logo flex items-center gap-2">
          <img
            ref={Logo}
            src={dec ? `logoBlack.svg` : `logoWhite.svg`}
            alt=""
          />
          <div
            ref={LogoColor}
            className={`Jaro text-2xl ${
              dec ? "text-black" : "text-white"
            } transition-all`}
          >
            Your Way
          </div>
        </div>
      </Link>
      <div>
        <ul className="flex items-center gap-4">
          <li className={UserData ? "block" : "hidden"}>
            <Link to={"/myTrips"}>
              <Button
                ref={ButtColor2}
                className={`${
                  dec
                    ? "bg-black hover:bg-black/80 text-white"
                    : "bg-white hover:bg-white/80 text-black"
                } cursor-pointer`}
              >
                My trips
              </Button>
            </Link>
          </li>
          <li>
            {UserData ? (
              <Popover>
                <PopoverTrigger>
                  <div
                    ref={ButtColor}
                    className={`${
                      dec
                        ? "bg-black hover:bg-black/80 text-white"
                        : "bg-white hover:bg-white/80 text-black"
                    } cursor-pointer rounded-[10px] p-1`}
                  >
                    <MdPerson size={30} />
                  </div>
                </PopoverTrigger>
                <PopoverContent className="bg-neutral-700 text-white border-neutral-950">
                  <button
                    onClick={() => {
                      localStorage.setItem("User", null);
                      setUser(null);
                      setUserData(null);
                    }}
                    className="py-1 px-5 border-neutral-950 rounded-lg cursor-pointer"
                  >
                    Sign Out
                  </button>
                </PopoverContent>
              </Popover>
            ) : (
              <Button
                ref={ButtColor}
                onClick={() => setOpendialog(true)}
                className={`${
                  dec
                    ? "bg-black hover:bg-black/80 text-white"
                    : "bg-white hover:bg-white/80 text-black"
                }   cursor-pointer`}
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

export default Navbar;
