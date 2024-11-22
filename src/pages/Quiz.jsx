import { useState } from "react";

function Quiz() {
  const quizData = [
    {
      id: 1,
      ques: "What is the capital of France?",
      options: ["Paris", "Berlin"],
      correctOption: "Paris",
    },
    {
      id: 2,
      ques: "Which planet is known as the Red Planet?",
      options: ["Mars", "Venus"],
      correctOption: "Mars",
    },
    {
      id: 3,
      ques: "What is the chemical symbol for water?",
      options: ["H2O", "CO2"],
      correctOption: "H2O",
    },
    {
      id: 4,
      ques: "Who wrote 'Romeo and Juliet'?",
      options: ["William Shakespeare", "Charles Dickens"],
      correctOption: "William Shakespeare",
    },
    {
      id: 5,
      ques: "What is the largest mammal in the world?",
      options: ["Blue Whale", "Elephant"],
      correctOption: "Blue Whale",
    },
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const currentQuestion = quizData[currentQuestionIndex];

  function handleClick() {
    setTimeout(() => {
      setCurrentQuestionIndex((prev) =>
        prev === quizData.length - 1 ? prev : prev + 1
      );
      setSelectedOption(null);
    }, 1 * 1000);
  }

  const partVisibleQuestionRight = (
    <div
      className={`shadow-[0_2px_16px_#00000059]    bg-white rounded-tl-xl rounded-bl-xl w-4 `}
    ></div>
  );

  const partVisibleQuestionLeft = (
    <div
      className={`shadow-[0_2px_16px_#00000059]    bg-white rounded-tr-xl rounded-br-xl w-4 `}
    ></div>
  );

  return (
      <div className="w-full flex flex-col  gap-7 pt-10 pb-[60px] md:border">
        <div className="flex flex-col gap-[30px]">
          <div className="flex  items-center px-6   justify-between">
            <div className="flex items-center">
              <img
                className="h-auto  max-h-12 w-auto object-contain"
                src="/svgs/logo.svg"
                alt="logo"
              />

              <img
                className="h-auto w-auto  max-h-9 object-contain"
                src="/images/logo-text.png"
                alt="logo-text"
              />
            </div>

            <button className="text-white text-lg font-semibold leading-[25.2px] text-center underline">
              Exit
            </button>
          </div>

          <button className="mx-auto py-[6px] px-[10px] rounded-[28px] bg-white font-Montserrat text-base font-semibold leading-[22.4px] text-center text-[#E30713]">
            00:29
          </button>
        </div>

        <div className="flex w-full">
          {currentQuestionIndex !== 0 && partVisibleQuestionLeft}
          <div className="py-5  w-5/6 shadow-[0_2px_16px_#00000059]    bg-white rounded-xl mx-auto">
            <button className="mx-[15px] py-[2px]  px-[10px] rounded-3xl text-white font-Montserrat text-xs font-semibold leading-[16.8px] text-center bg-[#E30713]">
              {currentQuestionIndex + 1}/10
            </button>

            <h1 className=" px-[15px]  font-Montserrat text-lg font-semibold  text-left text-[#1E1E1E] mt-4">
              {currentQuestion.ques}
            </h1>

            <div
              className={` ${
                isListening ? " gap-0 mt-[6.25px]" : " gap-[14px] mt-9"
              } flex flex-col items-center  `}
            >
              <img
                className={` ${isListening ? "h-[124px]" : "h-20 "} `}
                src={
                  isListening
                    ? "/svgs/listening-red.svg"
                    : "/svgs/rounded-mic.svg"
                }
                alt=""
              />

              <span className="font-Montserrat font-semibold leading-[22.4px] text-center text-[#1E1E1E]">
                {isListening ? "Listening..." : "Tap to speak"}
              </span>
            </div>

            <div className="flex flex-col  gap-y-[42px]  mt-6  ">
              <form className=" flex flex-col gap-y-2 px-5 text-nowrap">
                {currentQuestion.options.map((option, index) => (
                  <label
                    data-value={option}
                    onClick={() => {
                      handleClick();
                      setSelectedOption(option);
                    }}
                    key={index}
                    className={`${
                      selectedOption && option === currentQuestion.correctOption
                        ? "border-[#1BAB29] bg-[#1BAB29B2]"
                        : selectedOption === null
                        ? "border-[#FFD07666]"
                        : "border-[#FF3434]"
                    } border-[4px] text-left font-Montserrat text-base font-semibold leading-[22.4px] rounded-xl border-solid  py-[14px] px-3 text-[#1E1E1E]`}
                    htmlFor="1"
                  >
                    0{index + 1}. {option}
                  </label>
                ))}

                {/* <label
                className="font-Montserrat text-base font-semibold leading-[22.4px] text-left rounded-xl border-[4px] border-solid  py-[14px] px-3  border-[#1BAB29] bg-[#1BAB29B2] text-white"
                htmlFor="1"
              >
                02. {"2nd option"}
              </label> */}
              </form>

              <button
                disabled={
                  quizData.length - 1 === currentQuestionIndex || selectedOption
                }
                onClick={() => setCurrentQuestionIndex((prev) => prev + 1)}
                className="disabled:bg-gray-400 py-2 px-6 border-[1.55px] border-[#7575754D]  rounded-[9.32px]  ml-auto mr-5   font-Montserrat text-base font-semibold leading-[22.4px] text-center text-[#1E1E1E] "
              >
                Skip
              </button>
            </div>
          </div>
          {currentQuestionIndex !== quizData.length - 1 && partVisibleQuestionRight}
        </div>
      </div>
  );
}

export default Quiz;
