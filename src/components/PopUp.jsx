import React, { useEffect, useState } from "react";

const PopUp = ({ children, bg, className }) => {
  // console.log();

  const [animation, setAnimation] = useState(false);

  useEffect(() => {
    let timer = setTimeout(() => {
      setAnimation(true);
    }, 200);
    return () => {
      setAnimation(false);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-50 ">
      <div
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.4)",
          backdropFilter: "blur(0px)",
        }}
        className="absolute inset-0 blur-md "
      ></div>

      <div
        className={`opacity-0 w-[90%]
         ${
           animation &&
           "transition-all duration-200 delay-100 ease-in opacity-100"
         } ${
          bg ? bg : "bg-white"
        } p-6 rounded-xl md:w-[300px]  flex justify-center items-center relative ${className}`}
      >
        {children}
      </div>
    </div>
  );
};
export default PopUp;
