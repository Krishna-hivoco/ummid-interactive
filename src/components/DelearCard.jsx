import React from "react";

function DelearCard() {
  return (
    <div className="p-[10px] bg-white flex items-center rounded-lg mb-2">
      <div className="flex flex-1 gap-1">
        <img
          className="rounded-full w-14 h-14"
          src="/images/Haier Onam (9) 2.png"
          alt="Haier Onam"
          srcSet=""
        />
        <div className="flex flex-col gap-1">
          <small className="text-sm font-semibold montserrat">
            Delear Name
          </small>
          <small className="text-xs font-semibold ">location</small>
          <p className="text-xs font-normal ">
            Address: A-35, First Floor, Karol Bagh, New Delhi - 110011
          </p>
          <small className="text-xs font-normal ">
            Contact: +91-1234567899
          </small>
        </div>
      </div>
      <strong className="underline font-normal montserrat  text-base">
        Connect
      </strong>
    </div>
  );
}

export default DelearCard;
