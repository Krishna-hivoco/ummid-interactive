import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { useNavigate } from "react-router-dom";
import getPlatform from "../js/plateforn.jsx";

const Splash = () => {
  const [isAnimating, setIsAnimating] = useState(true);
  const [platform, setPlatform] = useState("");

  const navigate = useNavigate();

  // useEffect(() => {
  //   sessionStorage.setItem("uuId", uuidv4());
  //   console.log(sessionStorage.getItem("uuId"));
  // }, []);

  useEffect(() => {
    const platformName = getPlatform();
    setPlatform(platformName);
  }, []);

  const handleClick = (path) => {
    if (path === `/interaction`) {
      navigate(`${path}/?platform=${platform}`);
    } else {
      navigate(path);
    }
  };

  const items = [
    {
      title: "Explore Shalimar Products",
      icon: "/svgs/search.svg",
      path: "/interaction",
    },
    {
      title: "Find nearest Dealer",
      icon: "/svgs/delear.svg",
      path: "/enter-your-location",
    },
    {
      title: "Find Trusted Painter",
      icon: "/svgs/paint.svg",
      path: "/get-painter-using-location",
    },

    {
      title: "Download Brochure PDF",
      icon: "/svgs/download.svg",
      path: "/download",
    },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, 1000); // Duration of the animation

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      // className="relative h-svh w-full text-center px-8 py-12 md:p-6"
      className="relative  h-full w-full flex-1 flex flex-col gap-y-[70px] md:gap-y-12  text-center  px-8 py-16  py12 md:p-9"
    >
      {/* // mt-20 md:mt-[1rem] mx-auto max-h-24  */}

      <img
        className={`md:mt-[rem] mx-auto max-h-[110x]  w-full max-w-72 md:max-w-48             
          ${
            isAnimating
              ? "animate-positionToCenter"
              : "animate-centerToPosition"
          }`}
        src="/images/logo-col.png"
        alt="Powered"
      />

      <div
        // className={`mt-24 md:mt:[2rem] `}
        className="mt24 md:mt:[2rem] md:w-64  flex-1  flex flex-col items-center justify-center gap-[10px] md:gap-2 w-72  mx-auto "
      >
        {items?.map((e, index) => (
          <div
            onClick={() =>
              ["Find Trusted Painter", "Play to Win"].includes(e.title)
                ? {}
                : handleClick(e.path)
            }
            key={index}
            className={`${
              ["Find Trusted Painter"].includes(e.title)
                ? "bg-[#D6D6D6] border-[#D6D6D6] cursor-not-allowed"
                : "bg-white border-[#F7F7F7]/50"
            } group 
            
            md:max-h-14  group rounded-[6rem] w-full mx-auto max-h-  font-Poppins text-xl font-semibold text-center py-3 px-3 border-2 flex-1 flex items-center cursor-pointer hover:shadow-xl
            
            ${
              !isAnimating
                ? "opacity-100 scale-100 transition-all duration-700 delay-200"
                : "opacity-0 scale-50"
            }`}
          >
            <div className="flex flex-1 gap-1 items-center">
              <img
                className={`h-8 ${index === 2 && "opacity-30"}`}
                src={e.icon}
                alt="option icon"
              />
              <div className="flex flex-col items-start">
                <strong
                  className={`${index === 2 && "text-[#969696]"}
                   text-left  font-Poppins text-[13.23px] leading-[18.5px]  font-semibold`}
                >
                  {e.title}
                </strong>

                {["Find Trusted Painter", "Play to Win"].includes(e.title) && (
                  <span className="font-Poppins text-xs font-semibold ">
                    Coming Soon...{" "}
                  </span>
                )}
              </div>
            </div>
            <img
              className={`group-hover:animate-bounceLR ${
                index === 2 && "opacity-50"
              }`}
              src="/svgs/arrow.svg"
              alt="arrow"
            />
          </div>
        ))}
      </div>

      <img
        className="mx-auto h-12 md:h-8"
        src="/images/powered.png"
        alt="Powered"
      />
    </div>
  );
};

export default Splash;
