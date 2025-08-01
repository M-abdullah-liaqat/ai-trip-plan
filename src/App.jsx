import { useState, useRef } from "react";
import { Button } from "./components/ui/button";
import viteLogo from "/vite.svg";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination } from "swiper/modules";
import { Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";

const slides = [1, 2, 3, 4];

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

function App() {
  const swiperRef = useRef(null);

  const updateSlideRotation = () => {
    const swiper = swiperRef.current.swiper;

    swiper.slides.forEach((slide, index) => {
      const el = slide;
      el.style.transition = "transform 0.4s ease";

      if (index === swiper.activeIndex) {
        el.style.transform = "rotateY(0deg)";
        el.style.transform = "scale(1.2)";
        // el.style.zIndex = 10;
        el.style.opacity = 1;
      } else if (index < swiper.activeIndex) {
        el.style.transform = "rotateY(-25deg)";
        el.style.transform = "scale(0.8)";
        // el.style.opacity = 0.6;
      } else {
        el.style.transform = "rotateY(25deg)";
        el.style.transform = "scale(0.8)";
        // el.style.opacity = 0.6;
      }
    });
  };
  return (
    <div>
      <div>
        <div className="w-[100%] bg-slate-300 md:h-[100vh] h-[90vh] justify-self-center flex items-center justify-center ">
          <Swiper
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            loop={true}
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={"auto"}
            coverflowEffect={{
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            }}
            pagination={true}
            modules={[Autoplay, EffectCoverflow, Pagination]}
            className="w-[100%] h-[100%] mySwiper"
          >
            <SwiperSlide
              style={{
                // width: "60%",
                height: "100%",
              }}
            >
              <img
                className="w-[100%] h-[100%] object-cover md:object-bottom-left"
                src="New folder/1.png"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                className="w-[100%] h-[100%] object-cover"
                src="New folder/2.png"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                className="w-[100%] h-[100%] object-cover"
                src="New folder/3.png"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                className="w-[100%] h-[100%] object-cover"
                src="New folder/4.png"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                className="w-[100%] h-[100%] object-cover object-[75%_75%]"
                src="New folder/5.png"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                className="w-[100%] h-[100%] object-cover object-[25%_75%]"
                src="New folder/6.png"
              />
            </SwiperSlide>
            <div className="w-[100%] h-[100%] bg-black/40 z-10 absolute top-0 flex flex-col items-center justify-center gap-8 ">
              <div className="2xl:w-[50%] lg:w-[65%] oswald xl:text-8xl text-7xl z-30 text-white font-bold text-center">
                Stress-Free Travel Starts with a Solid Plan
              </div>
              <div className="flex justify-center items-center gap-2">
                <Link to={`/generator`}><button className="md:text-[32px] text-[24px]  py-2 px-18 cursor-pointer hover:bg-white/80 bg-white rounded-2xl font-medium transition-all">
                  Let&#39;s Plan It!
                </button></Link>
              </div>
            </div>
          </Swiper>
        </div>
      </div>
      <div className="flex flex-col items-center px-8 justify-center my-10 gap-15">
        <div className="text-4xl text-center font-bold">
          Plan Your Perfect Trip, Effortlessly
        </div>
        <div className="lg:w-[60%] md:w-[80%] justify-self-center text-center text-2xl">
          Discover, organize, and enjoy your next adventure with ease. Our
          AI-powered trip planner helps you create custom itineraries, find the
          best destinations, and manage every detail—all in one place.
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 2xl:w-[1532px] w-[100%]">
          <div className="flex flex-col items-center justify-center gap-2 border-2 border-black/20 rounded-2xl p-5">
            <div className="text-2xl font-bold text-center">
              Personalized Recommendations
            </div>
            <div className="text-xl text-center">
              {" "}
              Get suggestions tailored to your interests and travel style.
            </div>
          </div>
          <div className="flex flex-col items-center justify-center gap-2 border-2 border-black/20 rounded-2xl p-5">
            <div className="text-2xl font-bold text-center">
              Smart Itineraries
            </div>
            <div className="text-xl text-center">
              {" "}
              Build your trip day-by-day with just a few clicks.
            </div>
          </div>
          <div className="flex flex-col items-center justify-center gap-2 border-2 border-black/20 rounded-2xl p-5">
            <div className="text-2xl font-bold text-center">
             Collaborate & Share
            </div>
            <div className="text-xl text-center">
              {" "}
            Plan together with friends or family in real time.
            </div>
          </div>
        </div>
        <div>
          <Link to={`/generator`}><button className="text-[24px]  py-2 px-18 cursor-pointer hover:bg-black/80 bg-black text-white rounded-2xl font-medium transition-all">
            Get Started
          </button></Link>
        </div>
      </div>
    </div>
  );
}

export default App;
