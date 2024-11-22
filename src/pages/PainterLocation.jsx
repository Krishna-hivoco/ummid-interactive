import React, { useState } from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import { getFullAddress } from "../js/location";

function PainterLocation() {
  const [currectaddress, setCurrectaddress] = useState("Your Current Location");
  const navigate = useNavigate();
  const getAddress = async () => {
    const info = await getFullAddress();
    // console.log("getaddress", info.address_line2);
    setCurrectaddress(info.address_line2);
  };

  return (
    <div className=" pt-10 w-full ">
      {/* <div className="bg-white px-[10px] py-[6px] text-[#E30713] rounded-full text-base font-semibold montserrat w-fit mt-9 mx-auto">
        00:30
      </div> */}
      <div className="px-6">
        <Header isarrow={false} isexit={false} />
      </div>
      <section className="mt-8 text-white p-6 ">
        <h6 className="montserrat text-xl font-semibold">
          Find your Trusted Painter with HiVoco’s AI
        </h6>
        <div className="border-4  border-[#E6F3FF80] rounded-xl p-3 flex items-center mt-4 gap-[3px]">
          <input
            inputMode="numeric"
            max={6}
            className="flex flex-1 bg-transparent placeholder:text-white outline-none montserrat text-base font-semibold"
            placeholder="Enter Pincode"
          />
          <img src="/svgs/mic.svg" alt="Mic" srcSet="" />
        </div>

        <div
          onClick={() => navigate("/get-your-nearest-dealers")}
          className="flex justify-center"
        >
          <button className="text-base font-semibold px-3 py-[13px] border-4  border-[#E6F3FF80] rounded-xl mx-auto min-w-min mt-20 text-center">
            Get Painter Details
          </button>
        </div>
      </section>
      <img
        className="mx-auto w-screen mt-2"
        src="/images/paint-box-collage.png"
        alt="paint-box-collage"
      />
    </div>
  );
}

export default PainterLocation;
