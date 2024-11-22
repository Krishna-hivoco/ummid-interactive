import { useEffect, useRef, useState } from "react";
import useSpeechRecognition from "../hooks/useSpeechRecognition";
import SmoothTextReveal from "../components/TextReveal";
import Interrupt from "../components/Interrupt";
import { useNavigate } from "react-router-dom";

function Interaction({ platform }) {
  const {
    startSpeechRecognition,

    speechText,
    hasRecognitionEnded,
    setHasRecognitionEnded,
    setSpeechText,
  } = useSpeechRecognition();

  const [language, setLanguage] = useState("");
  const [isUserSpeaking, setIsUserSpeaking] = useState(false);
  const [isVideoRendering, setIsVideoRendering] = useState(false);
  const [isStopImgVisible, setIsStopImgVisible] = useState(true);
  const [isFirstAPICall, setIsFirstAPICall] = useState(true);
  const [end, setEnd] = useState(0);
  const navigate = useNavigate();
  const audioRef = useRef(null);
  const videoRef = useRef(null);
  const [uuId, setUuId] = useState(null);

  async function firstAPICall(uniqueId) {
    try {
      let response = await fetch(
        "https://demo.thefirstimpression.ai/api/start",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: uniqueId,
          }),
        }
      );
      let data = await response.json();
      playAudio(data?.audio);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  useEffect(() => {
    const uniqueId = sessionStorage.getItem("uuId");
    uniqueId && setUuId(uniqueId);
    firstAPICall(uniqueId);
  }, []);

  const messages = [
    // "Hey, I'm Shalimar AI. Let me know how I can help.",
    "Hope I was able to assist you. How can I help you further?",
    "Yeah, you are doing good! You can ask me anything.",
    "Go ahead with your questions, I'm all tuned in.",
    "I'm here to help, just let me know what you need!",
    "Feel free to ask me anything. I'm ready to assist!",
    "Got more questions? I'm here to answer them!",
    "Don't hesitate to reach out with any queries. I'm all ears!",
    "What else can I do for you? Your questions are welcome!",
    "I'm ready for your next question. Let's keep going!",
  ];

  const [message, setMessage] = useState(messages[0]);
  const [msgIndex, setMsgIndex] = useState(0);
  const [superText, setSuperText] = useState("");
  const [convoNumber, setConvoNumber] = useState(0);

  useEffect(() => {
    if (isUserSpeaking) {
      setMessage(messages[msgIndex]);
      setMsgIndex(msgIndex + 1);
    }
  }, [isUserSpeaking]);

  const [sentence, setSentence] = useState("");
  const [currentSubtitle, setCurrentSubtitle] = useState("");

  useEffect(() => {
    if (!audioRef?.current || !sentence) return;

    const words = sentence.split(" ");
    let wordIndex = 0;
    let timeoutId;

    const displayWord = () => {
      setCurrentSubtitle(() => {
        const updatedSubtitle = words.slice(wordIndex, wordIndex + 5).join(" ");
        wordIndex += 5;
        return updatedSubtitle;
      });

      // wordIndex += 8;
      if (wordIndex < words.length) {
        timeoutId = setTimeout(displayWord, 2000);
      }
    };

    displayWord();

    return () => clearTimeout(timeoutId);
  }, [sentence]);
  async function sendTextToBackend(text) {
    try {
      let response = await fetch(
        "https://demo.thefirstimpression.ai/api/process",
        // "http://192.168.1.5:8701/process",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text: text,
            user_id: uuId,
          }),
        }
      );
      let data = await response.json();
      playAudio(data?.audio);
      setEnd(data.end);
      setIsFirstAPICall(false);
    } catch (error) {
      setIsFirstAPICall(false);
      console.error("Error:", error);
    }
  }

  const playAudio = (audioBase64) => {
    const audioSrc = `${audioBase64}`;
    if (audioRef.current) {
      audioRef.current.src = audioSrc;
      audioRef.current.play();
    }
  };

  const enter = async () => {
    let value = speechText.trim();
    if (value) {
      console.log("send text to backend");
      sendTextToBackend(value);
    }
    setHasRecognitionEnded(false);
    setSpeechText("");
  };

  function handleAudioEnd() {
    startSpeechRecognition();
    setIsVideoRendering(false);
    setIsUserSpeaking(true);
    setIsStopImgVisible(true);
    setSuperText("");
    if (end === 1) {
      navigate("/");
    }
  }

  if (hasRecognitionEnded) {
    setTimeout(() => {
      setIsUserSpeaking(false);
    }, 1 * 1000);

    enter();
  }

  return (
    <div
      className={`${
        isVideoRendering
          ? "parent before:backdrop-blur-xl md:before:backdrop-blur-none h-screen flex flex-col items-center justify-center gap-16 md:gap-5"
          : ""
      } w-full h-svh md:h-[98vh] flex flex-col overflow-hidden`}
    >
      <audio ref={audioRef} onEnded={handleAudioEnd} className="hidden"></audio>
      <video
        className={`${
          isVideoRendering
            ? " md:h-auto w-full opacity-100 child"
            : "opacity-0 hidden pointer-events-none"
        }  object-cover self-center  inset-0 transition-opacity duration-[2000ms] ease-in-out opacity-100`}
        // onEnded={}
        loop
        muted
        playsInline
        autoPlay
        ref={videoRef}
      >
        Your browser does not support the video tag.
      </video>

      <div className="flex flex-col items-center gap-11 md:gap-6 child">
        {isVideoRendering && currentSubtitle.length > 0 && (
          <div className="text-center text-xl bg-black/50 text-white  md:text-base w-screen md:w-80 p-[10px] flex justify-center">
            {currentSubtitle}
          </div>
        )}

        {isVideoRendering && (
          <Interrupt
            className={`child`}
            isVideoRendering={isVideoRendering}
            setIsStopImgVisible={setIsStopImgVisible}
            audioRef={audioRef}
            isUserSpeaking={isUserSpeaking}
            handleAudioEnd={handleAudioEnd}
            isStopImgVisible={isStopImgVisible}
          />
        )}
      </div>

      <div
        className={`flex-1 w-full h-full md:h-auto py-16 inset-0 transition-opacity duration-500 
                   ${
                     isVideoRendering
                       ? "opacity-0 pointer-events-none hidden"
                       : "opacity-100"
                   }
           `}
      >
        <div
          className={`  w-full h-full flex flex-col ${
            isVideoRendering ? "hidden" : ""
          }   ${
            isUserSpeaking
              ? "md:m-0 gap-20 md:gap-4 xl:gap-20"
              : "gap-y-14 md:gap-y-5 2xl:gap-12"
          }`}
        >
          <div
            style={{
              gap: !isUserSpeaking && superText.length > 0 ? "40px" : "",

              "@media (minWidth: 1024px)": {
                gap: !isUserSpeaking && superText.length > 0 ? "24px" : "",
              },
            }}
            className={`flex flex- flex-col gap-y-20  md:gap-y-2 xl:gap-y-8 2xl:gap-y-12 px-9 md:w-full  ${
              superText && !isVideoRendering && "2xl:gap-y-16"
            } `}
          >
            <img
              className="mx-auto  max-w-56 lg:max-w-52"
              src="/images/logo.png"
              alt="logo hivoco"
            />
            {!isUserSpeaking && !superText && (
              <p className="text-white flex-  font-Poppins text-base font-semibold text-center md:w-full md:text-nowrap">
                Find answers to your questions <br /> with our Voice AI model...
              </p>
            )}

            {superText && <SmoothTextReveal text={superText} />}
            {!isUserSpeaking && superText && (
              <Interrupt
                isVideoRendering={isVideoRendering}
                setIsStopImgVisible={setIsStopImgVisible}
                audioRef={audioRef}
                isUserSpeaking={isUserSpeaking}
                handleAudioEnd={handleAudioEnd}
                isStopImgVisible={isStopImgVisible}
              />
            )}
          </div>

          {/* move bucket downward */}
          <div
            className={`flex flex- flex-col
              ${
                isUserSpeaking ? "gap-y-12 2xl:gap-y-12 " : "gap-y-4 2xl:gap-0"
              }`}
            x
          >
            {isUserSpeaking ? (
              <div className=" botIsListening flex flex-1 flex-col gap-y-12 md:gap-12">
                <h1 className="px-6 font-Poppins text-[19px] font-semibold leading-[22.8px] md:text-base text-center text-white">
                  {message ||
                    " Hey, I'm Sensodyne Interactive Demo, Let me know how I can help"}
                </h1>

                <div className="flex flex-col gap-8 xl:gap-12 w-full">
                  {/* <div className="w-full mx-auto   h-36 flex  items-center  ">
                    <img
                      className="w-full "
                      src="/gif/waves.gif"
                      alt="bot listening wave"
                    />
                  </div> */}
                  <div className="w-full  h-36 flex  items-center justify-center  ">
                    <div
                      // onClick={() => {
                      //   !isAPIStillCalling && setIsUserSpeaking(true);
                      //   startRecording();
                      // }}
                      className="relative w-28 h-28 2xl:w-[120px] 2xl:h-[120px] overflow-hidden border-4 border-white rounded-full"
                    >
                      <div className="absolute inset-0 bg-gradient-to-tr from-yellow-400 via-red-400 to-purple-500 animate-gradient-rotate "></div>

                      <div className="absolute inset-0 flex justify-center items-center">
                        <p className="text-white text-2xl font-bold">
                          <img
                            className="w-full "
                            src="/gif/Sound waves white.gif"
                            alt="bot listening wave"
                          />
                        </p>
                      </div>
                    </div>
                  </div>

                  <h2 className="font-Poppins text-[19px] font-semibold leading-[26.6px] text-center text-white">
                    I'm listening ...
                  </h2>
                </div>
              </div>
            ) : (
              !superText && (
                <div className="w-full flex flex-col gap-y-12 items-center">
                  <div
                    onClick={() => !isUserSpeaking && handleAudioEnd()}
                    className="relative w-28 h-28 overflow-hidden border-4 border-white rounded-full"
                  >
                    <div className="absolute inset-0 bg-gradient-to-tr from-yellow-400 via-red-400 to-purple-500 animate-gradient-rotate "></div>

                    <div className="absolute inset-0 flex justify-center items-center">
                      <p className="text-white text-2xl font-bold">
                        <img
                          className="h-11 object-contain animate-scale"
                          src="/images/VectorMIC.png"
                          alt="mic gif"
                        />
                      </p>
                    </div>
                  </div>

                  <p className="font-Poppins text-base leading-[22.4px] text-center text-white">
                    Tap on mic to interact
                  </p>
                </div>
                // <div
                //   className={` w-full flex flex-1 flex-col gap-y-5 md:gap-y-4  2xl:gap-6 items-center
                //  `}
                // >
                //   {/* <img
                //     onClick={() => !isUserSpeaking && handleAudioEnd()}
                //     className="max-h-[7.5rem] md:max-h-28"
                //     src="/gif/mic icon.gif"
                //     alt="mic gif"
                //   /> */}
                //   <div
                //     onClick={() => !isUserSpeaking && handleAudioEnd()}
                //     className="relative w-[100px] h-[100px]  md:w-[90px] md:h-[90px] md:aspect-square overflow-hidden border-4 border-white rounded-full"
                //   >
                //     <div className="absolute inset-0 bg-gradient-to-tr from-yellow-400 via-red-400 to-purple-500 animate-gradient-rotate "></div>

                //     <div className="absolute inset-0 flex justify-center items-center">
                //       <p className="text-white text-2xl font-bold">
                //         <i
                //           className="fa fa-microphone"
                //           style={{ fontSize: "35px", color: "white" }}
                //         ></i>
                //       </p>
                //     </div>
                //   </div>

                //   <p className="font-Poppins text-base leading-[22.4px] text-center text-white">
                //     Tap on mic to interact
                //   </p>
                // </div>
              )
            )}

            <div className="flex flex- flex-col gap-y-4 ">
              {/* {!isUserSpeaking && (
                <div className="flex-1 ">
                  <img
                    className={`
                    ${
                      !isUserSpeaking && !isVideoRendering && superText
                        ? "hidden"
                        : ""
                    }
                   max-w-[272px] object-cover h-auto  md:max-w-56 mx-auto`}
                    src="/images/paint-box-collage.png"
                    alt="bucket image"
                  />
                </div>
              )}
 */}
              <div className="absolute bottom-9 left-1/2 -translate-x-1/2">
                <img
                  className="h-[33px] lg:h-10  self-center"
                  src="/images/powered-by-hivoco.png"
                  alt="powered-by-hivoco image"
                />
                {/* <span className="mx-auto  text-white font-Inter text-[13px] leading-[16px] font-normal ">
                  Powered by
                </span>
                <img
                  className="h-7 2xl:h-6  self-center"
                  src="/images/hivoco-logo.png"
                  alt="hivoco-logo powered"
                /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Interaction;
