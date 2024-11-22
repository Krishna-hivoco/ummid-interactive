import { Link } from "react-router-dom";
import getPlatform from "../js/plateforn.jsx";
import { useEffect, useState } from "react";

function Home() {
  const [platform, setPlatform] = useState("");

  useEffect(() => {
    const platformName = getPlatform();
    setPlatform(platformName);
  }, []);

  return (
    <div className="w-full h-full md:rounded-2xl ">
      <div className="h-full flex  flex-col justify-between pb-12 ">
        <div className="flex flex-1 flex-col justify-center items-center ">
          <img
            className="w-[132px]"
            src="/svgs/logo-text.svg"
            alt="logo-text"
          />
        </div>

        <Link
          to={`interaction?platform=${platform}`}
          className="rounded-[120px]  mx-6 bg-white font-Poppins text-xl font-semibold text-center py-4  border-2 border-[#F7F7F7]/50   hover:shadow-md"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
}

export default Home;
