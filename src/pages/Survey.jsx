import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ProgressBar from "./ProgressBar";

const Survey = ({
  questionId,
  setQuestionId,
  language,
  selectedOption,
  setSelectedOption,
  quizData,
  setQuizData,
}) => {
  const [data, setData] = useState("");
  const navigate = useNavigate();

  useLayoutEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://hongs-hindi.interactivedemos.io/api/first_question"
          // "http://192.168.1.9:8701/api/first_question"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        console.log(result);
        setData(result);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const audioRef = useRef(null);

  const playAudio = (src = "english") => {
    if (audioRef.current) {
      audioRef.current.src = src;
      audioRef.current.play();
    }
  };

  const playAudioBasedOnLanguage = (language) => {
    let src = "";
    switch (language) {
      case "English":
        src = "/audios/eng_inital.mp3";
        break;
      case "Hindi":
        src = "/audios/hindi_in.mp3";

        break;
      case "Bengali":
        src = "/audios/bangla.mp3";

        break;
      case "Telugu":
        src = "/audios/telugu.mp3";

        break;
      case "Marathi":
        src = "/audios/marathi_init.mp3";

        break;
      case "Malayalam":
        src = "/audios/malyalm.mp3";

        break;
      case "Kannada":
        src = "/audios/kannda.mp3";

        break;
      case "Tamil":
        src = "/audios/tamil_int.mp3";

        break;

      default:
        break;
    }
    playAudio(src);
  };

  useEffect(() => {
    playAudioBasedOnLanguage(language);
  }, []);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    handlePostRequest(option); // Pass the option directly
  };

  const handlePostRequest = async (option) => {
    if (questionId === 1 && option === "No") {
      setQuestionId(7);
      return;
    }
    setQuizData([...quizData, { ...data, selectedOption: option }]);

    if (questionId === 6) {
      // no of questions
      setQuestionId(questionId + 1);
      return;
    }

    try {
      const res = await fetch(
        "https://hongs-hindi.interactivedemos.io/api/next_question",
        // "http://192.168.1.9:8701/api/next_question",

        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            question_id: questionId,
            answer: option, // Use the passed option
          }),
        }
      );

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      setData(data);
      setQuestionId(questionId + 1);
      console.log(data);
    } catch (error) {
      console.error("Error:", error);
      // Consider showing user feedback here
    }

    setSelectedOption("");
  };

  return (
    <div className="relative w-full  h-full md:mx-auto md:max-w-64    py-11 flex flex-col  gap-6 select-none  px-8 md:px-0  ">
      <div className="flex flex-col items-center gap-y-7 w-full  mx-auto">
        <div className="flex w-full items-center justify-between">
          <Link to={"/explore-your-experience"}>
            <img src="/svgs/back.svg" alt="Back button" />
          </Link>
          {/* <img className="" src="/svgs/cross.svg" alt="Close button" /> */}
        </div>

        <div className="flex flex-col items-center gap-y-7  w-full ">
          <ProgressBar progress={(questionId / 6) * 100} />

          <span className=" h-6   px-3 py-0.5  text-white rounded-[26px] bg-white/30  font-poppins text-sm font-medium leading-[19.6px]">
            {questionId > 6 ? 6 : questionId} of 6
          </span>
        </div>
      </div>

      <div className=" flex flex-col gap-7  items-center w-full">
        <h2 className="font-Poppins text-lg font-medium leading-[25.2px] text-center text-white ">
          {data?.question}
        </h2>

        <div className="flex flex-col gap-8 w-full">
          <div className=" flex flex-col gap-y-3 md:gap-y-2 w-full mx-auto">
            {data?.options?.map((option, index) => {
              return (
                <span
                  onClick={() => handleOptionClick(option)}
                  key={index}
                  className={`
                    flex text-nowrap items-center justify-center   text-center   font-Poppins text-base font-medium leading-[22.4px]  text-white
              bg-white/40   w-full max-h-16 h-16 md:max-h-12 md:h-12  rounded-lg px-20
              
              ${
                option === selectedOption &&
                "bg-[#494949]/50 shadow-[0px_1.66px_4.97px_0px_#0000001A] border-white "
              } `}
                >
                  {option}
                </span>
              );
            })}
          </div>

          {/* <button
            disabled={!selectedOption ? true : false}
            onClick={() => {
              handlePostRequest();
            }}
            className="fixed bottom-12 w-4/5 py-3 disabled:opacity-70  mx-auto rounded-[104px]  bg-white border-2 border-[#F7F7F7]/50 font-Poppins text-lg font-semibold leading-[24.5px] text-center text-[#1E1E1E]"
          >
            Continue
          </button> */}
        </div>
      </div>

      <audio className="invisible" ref={audioRef} />
    </div>
  );
};

export default Survey;
