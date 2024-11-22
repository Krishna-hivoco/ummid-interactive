import { Link } from "react-router-dom";

const Interrupt = ({
  isVideoRendering,
  setIsStopImgVisible,
  audioRef,
  isUserSpeaking,
  handleAudioEnd,
  isStopImgVisible,
  className,
}) => {
  return (
    <div
      className={`interrupt flex flex-col items-center justify-center  ${
        isVideoRendering ? "gap-4" : "gap-8 md:gap-4"
      } ${className}`}
    >
      <img
        onClick={() => {
          setIsStopImgVisible(false);
          audioRef.current && audioRef.current.pause();
          setTimeout(() => {
            !isUserSpeaking && handleAudioEnd();
          }, 500);
        }}
        className={`${isVideoRendering ? "h-16" : "h-[84px] md:h-16"} `}
        src="/images/stop.png"
        alt="mic image"
      />

      {/* {!isVideoRendering && ( */}
      <Link to={"/"}>
        <img
          className={`${isVideoRendering ? "h-10" : "h-11"}`}
          src="/svgs/close.svg"
          alt="close image"
        />
      </Link>
      {/* )} */}
    </div>
  );
};

export default Interrupt;
