import { useEffect, useRef, useState } from "react";

const SmoothTextReveal = ({ text = "hello, how are you " }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  const endRef = useRef(null);

  useEffect(() => {
    if (endRef.current) {
      endRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [displayedText]);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText((prevText) => prevText + text[currentIndex]);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }, 60); // Adjust the delay (in milliseconds) between each character

      return () => clearTimeout(timer);
    }
  }, [currentIndex, text]);

  return (
    <p
      className={`scrollbar-hide font-Poppins  overflow-y-scroll h-56 md:h-44 2xl:h-60 mx-auto md:mx-0 flex flex-col items-center  text-white text-2xl leading-[28.8px] md:text-lg  md:leading-6 font-semibold text-left`}
    >
      {displayedText}
      <span className="invisible" ref={endRef}>
        |
      </span>
    </p>
  );
};

export default SmoothTextReveal;
