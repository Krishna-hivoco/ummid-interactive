import { useEffect, useRef, useState } from "react";

const Test = ({
  text = "hello, how are you At the 2024 Summer Olympics in Paris, the United States has the largest delegation, with 653 athletes. France, as the host nation, follows closely with 622 athletes. Japan also ranks highly, sending 447 athletes to the games​  At the 2024 Summer Olympics in Paris, the United States has the largest delegation, with 653 athletes. France, as the host nation, follows closely with 622 athletes. Japan also ranks highly, sending 447 athletes to the games​",
}) => {
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
      className={`scrollbar-hide font-Poppins  overflow-y-scroll h-56  mx-auto flex flex-col items-center  text-white text-2xl leading-[28.8px] font-semibold text-left`}
    >
      {displayedText}
      
      <span className="invisible" ref={endRef}>
        |
      </span>
    </p>
  );
};

export default Test;
