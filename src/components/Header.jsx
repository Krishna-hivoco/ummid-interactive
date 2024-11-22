import React from "react";
import { useNavigate } from "react-router-dom";

function Header({ isarrow, isexit }) {
  const navigate = useNavigate();
  return (
    <div className="w-full  flex items-center">
      <div className="flex flex-1 gap-2">
        {/* {isarrow && (
          <img
            onClick={() => navigate(-1)}
            src="/svgs/arrow-back.svg"
            alt="arrow"
            srcSet=""
          />
        )} */}
        <img
          onClick={() => navigate("/")}
          className="h-[48px] object-contain"
          src="/images/logo-col.png"
          alt="logo"
          srcSet=""
        />
      </div>
      {isexit && (
        <small className="font-Montserrat font-semibold text-lg underline text-white">
          Exit
        </small>
      )}
    </div>
  );
}

export default Header;
