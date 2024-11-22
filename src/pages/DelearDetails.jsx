import Header from "../components/Header";
import { Link, useLocation, useNavigate } from "react-router-dom";

function DelearDetails() {
  const location = useLocation();
  const data = location.state.result.data;

  console.log(location);

  const navigate = useNavigate();

  // console.log(location);

  if (!data || data.length === 0) {
    return (
      <div className="relative flex h-svh md:h-full flex-col justify-center items-center gap-2">
        <h3 className="text-xl font-medium text-white"> No Dealer Found</h3>;
        <button
          onClick={() => navigate(-1)}
          className="absolute text-nowrap bottom-16 w-64 max-h-16 p-[19px_16px_19px_12px]  rounded-[120px]  border-solid border-[#F7F7F780] bg-white text-[#1E1E1E]  text-center font-poppins text-[20px] font-semibold leading-[28px]"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="px-6 flex flex-col gap-y-4 pt-6 w-full h-full self-start  md:pb-6  pb-10">
      <div className="flex flex-col gap-y-5">
        <Link className="block w-fit" to="/">
          <img
            className="h-14 object-contain self-start"
            src="/images/logo-col.png"
            alt="logo"
          />
        </Link>

        <div className="flex items-center border-b-[0.5px] border-[#FFFFFF80] pb-2">
          <img src="/svgs/location-pin.svg" alt="Location-Pin" />
          <h6 className="font-Poppins text-base font-medium text-white">
            {location?.state?.postcode || location?.state?.pinCode || ""}
          </h6>
        </div>
      </div>

      <section 
      className="mx-auto w-full  flex flex-col gap-y-1  overflow-y-scroll scroll-smooth md:scrollbar-hide rounded-b-lg"
      >
        {data?.map((dealer, index) => {
          const text = dealer?.location
            .replace(/\r?\n|\r/g, ", ")
            .toLowerCase();
          return (
            <div
              key={index}
              className="p-2 max-w-80   bg-white flex flex-col items-center  gap-y-2 rounded-lg"
              // className="p-[10px] max-w-80 pb-1  bg-white flex flex-col items-center  gap-1 rounded-lg mb-2"
            >
              <div className="flex  flex-1 gap-2">
                <img
                  className="rounded-full w-14 h-14"
                  src="/images/Haier Onam (9) 2.png"
                  alt="Haier Onam"
                  srcSet=""
                />

                <div className="flex flex-col gap-1">
                  <small
                    className="text-[11.5px] leading-4  font-semibold font-Poppins text-[#1E1E1E]"
                    // className="text-sm font-semibold font-Poppins text-[#1E1E1E]"
                  >
                    {dealer.name}
                  </small>
                  {/* <small className="text-xs font-semibold ">location</small> */}
                  <p
                    className="font-Poppins text-[10px] text-left leading-[13.8px] font-normal text-[#595959] first-letter:capitalize capitalize"
                    // className="text-xs font-normal text-[#595959] capitalize"
                  >
                    {text}
                    {/* {dealer?.location} */}
                  </p>
                  <small
                    className="text-[10px] leading-[14px]  font-normal text-[#595959]"
                    // className="text-xs font-normal text-[#595959]"
                  >
                    +91-{dealer?.contact}
                  </small>
                </div>
              </div>

              <Link
                className="w-full p-1 text-center border-t text-[#595959]"
                to={"tel:+91" + dealer.contact}
              >
                <strong
                className="font-Poppins text-[12.2px] leading-[17px] font-medium text-[#161616]"
                // className="font-Poppins text-sm font-medium text-[#161616]"
                >
                  Connect
                </strong>
              </Link>
            </div>
          );
        })}
      </section>

    </div>
  );
}

export default DelearDetails;
