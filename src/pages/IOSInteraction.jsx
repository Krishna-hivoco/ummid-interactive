import { useEffect, useLayoutEffect, useRef, useState } from "react";
import HivocoPowered from "../components/HivocoPowered";
import { useNavigate } from "react-router-dom";

import SelectLanguage from "../components/SelectLanguage";
import SmoothTextReveal from "../components/TextReveal";
import Survey from "./Survey";
import useVoiceRecorder from "../hooks/useVoiceRecorder";
import blobToBase64 from "../js/blobToBase.jsx";
import debounce from "../js/debounce.jsx";
import Interrupt from "../components/Interrupt.jsx";
import { useMicrophone } from "../hooks/useMicrophone.jsx";

function IOSInteraction({ platform }) {
  const { openMic, closeMic } = useMicrophone();

  const {
    startRecording,
    stopRecording,
    recordingBlob,
    isRecording,
    recordingTime,
  } = useVoiceRecorder();
  const navigate = useNavigate();
  const [speechText, setSpeechText] = useState("start interactivedemos");
  const [language, setLanguage] = useState("");
  const [questionId, setQuestionId] = useState(1);
  const [isUserSpeaking, setIsUserSpeaking] = useState(false);
  const [isVideoRendering, setIsVideoRendering] = useState(false);
  const [isStopImgVisible, setIsStopImgVisible] = useState(true);
  const [isAPIStillCalling, setIsAPIStillCalling] = useState(false);
  const [isFirstAPICall, setIsFirstAPICall] = useState(true);
  const [selectedOption, setSelectedOption] = useState("");
  const [quizData, setQuizData] = useState([]);
  const audioRef = useRef(null);
  const videoRef = useRef(null);
  const [uuId, setUuId] = useState(null);

  useEffect(() => {
    const uniqueId = sessionStorage.getItem("uuId");
    uniqueId && setUuId(uniqueId);
  }, []);

  const messages = [
    // "Hey, I’m Shalimar AI. Let me know how I can help.",
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
        timeoutId = setTimeout(displayWord, 2000); // Adjust timing as needed
      }
    };

    displayWord();

    return () => clearTimeout(timeoutId); // Cleanup function to clear timeout
  }, [sentence]);

  // const handleRecordingComplete = async () => {
  //   if (recordingBlob) {
  //     blobToBase64(recordingBlob)
  //       .then((res) => {
  //         sendTextToBackend(res);
  //       })
  //       .catch((err) => console.log(err));
  //   }
  // };

  useEffect(() => {
    if (recordingBlob) {
      handleRecordingComplete();
    }
  }, [recordingBlob]);

  const handleRecordingComplete = async () => {
    if (recordingBlob) {
      try {
        const base64Audio = await blobToBase64(recordingBlob); // Convert blob to base64
        sendTextToBackend(base64Audio); // Send the base64 audio to the backend
      } catch (err) {
        console.error("Error processing the recording blob", err);
      }
    }
  };

  useEffect(() => {
    if (recordingTime > 6) {
      closeMic();
      stopRecording(); // Stop recording after 4 seconds
      setIsUserSpeaking(false); // Reset speaking state
    }
  }, [recordingTime]);

  const sendTextToBackend = debounce(async (text) => {
    setIsAPIStillCalling(true);
    try {
      let response = await fetch(
        "https://sangya.thefirstimpression.ai/process",
        
        // "http://192.168.186.175:8701/api/interactivedemos/process",
        // "http://192.168.1.5:8701/process",
        // "https://hongs-hindi.interactivedemos.io/api/interactivedemos/process",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            data: text,
            language: language.toLocaleLowerCase(),
            session_id: uuId,
            quiz: quizData,
            platform,
            isFirstAPICall,
          }),
        }
      );
      let data = await response.json();
      playAudio(data?.audio);
      setCurrentSubtitle("");
      setSentence(data.answer);
      data?.video_link && displayVideo(data?.video_link);
      setSuperText(data?.response);
      // setSuperText(data?.key_word?data?.key_word:"")
      setIsFirstAPICall(false);
      setConvoNumber(data?.audio ? convoNumber + 1 : convoNumber);
      setIsAPIStillCalling(false);
    } catch (error) {
      setIsFirstAPICall(false);
      setIsAPIStillCalling(false);

      console.error("Error:", error);
    }
  }, 200);

  const playAudio = (audioBase64) => {
    const audioSrc = `data:audio/mp3;base64,${audioBase64}`;
    if (audioRef.current) {
      audioRef.current.src = audioSrc;
      audioRef.current.play();
      // audioRef.current.playbackRate=2;
    }
  };

  const displayVideo = (videoSrc) => {
    setIsVideoRendering(true);
    console.log(videoSrc);
    if (videoRef.current) {
      videoRef.current.src = videoSrc;
      videoRef.current.play();
    }
  };

  const triggerVibration = () => {
    if (navigator.vibrate) {
      navigator.vibrate(200); // Vibrate for 200ms
    }
  };

  const preventDefault = (e) => {
    e.preventDefault(); // Prevent the default context menu on long press
  };

  useEffect(() => {
    if (language) {
      sendTextToBackend(speechText);
    }
  }, [language]);

  if (!language) {
    return <SelectLanguage language={language} setLanguage={setLanguage} />;
  }

  // if (language && questionId <= 6) {
  //   return (
  //     <Survey
  //       quizData={quizData}
  //       setQuizData={setQuizData}
  //       selectedOption={selectedOption}
  //       setSelectedOption={setSelectedOption}
  //       questionId={questionId}
  //       setQuestionId={setQuestionId}
  //       language={language}
  //     />
  //   );
  // }

  return (
    <div
      className={`${
        isVideoRendering
          ? "parent h-screen flex flex-col  items-center justify-center gap-16 "
          : ""
      } w-full `}
    >
      <audio
        ref={audioRef}
        onEnded={() => {
          setSuperText("");
          setIsVideoRendering(false);
          setIsUserSpeaking(true);
          openMic();
          startRecording();
          setSuperText("");
        }}
        className="hidden"
      ></audio>

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

      <div className="flex flex-col items-center gap-11 child">
        {isVideoRendering && currentSubtitle.length > 0 && (
          <div className="subtitle w-screen md:w-80 h-16 max-h-[80px] flex justify-center">
            {currentSubtitle}
          </div>
        )}

        {isVideoRendering && (
          <Interrupt
            className={`child`}
            isVideoRendering={isVideoRendering}
            setIsStopImgVisible={setIsStopImgVisible}
            audioRef={audioRef}
            // isUserSpeaking={isUserSpeaking}
            handleAudioEnd={() => {
              setIsStopImgVisible(false);
              audioRef.current && audioRef.current.pause();
              setTimeout(() => {
                setIsUserSpeaking(true);
                setIsVideoRendering(false);
                setSuperText("");
                openMic();
                startRecording();
              }, 500);
            }}
          />
        )}
      </div>

      {/* major ui starts here  */}
      <div
        className={`w-full h-svh md:h-auto py-16   inset-0 transition-opacity duration-500 
                   ${
                     isVideoRendering
                       ? "opacity-0 pointer-events-none hidden"
                       : "opacity-100"
                   }
           `}
      >
        <div
          className={`  w-full flex flex-col   ${
            isUserSpeaking ? "md:m-0 gap-20" : "gap-y-12"
          }`}
        >
          <div className=" flex flex-col gap-11 md:gap-6 px-9 md:w-full ">
            {/* <div className="flex items-center justify-center ">
              <img
                className="h-auto  max-h-[5.63rem] md:max-h-16 w-auto object-contain"
                src="/svgs/logo.svg"
                alt="logo"
              />

              <img
                className="h-auto w-auto  max-h-[4.5rem] md:max-h-14 object-contain"
                src="/images/logo-text.png"
                alt="logo-text"
              />
            </div> */}

            <img
              className="mx-auto  max-w-56 lg:max-w-52"
              src="/images/logo.png"
              alt="logo hivoco"
            />

            {!isUserSpeaking && !superText && (
              <p className="text-white  font-Poppins text-base font-semibold text-center md:w-full">
                Find answers to your questions <br /> with our Voice AI model...{" "}
              </p>
            )}

            {superText && <SmoothTextReveal text={superText} />}

            {!isUserSpeaking && !isVideoRendering && superText && (
              <div className="flex flex-col items-center justify-center gap-8">
                {/* <img  className="w-16 h-16" src= alt="stop image" /> */}

                <img
                  onClick={() => {
                    setIsStopImgVisible(false);
                    audioRef.current && audioRef.current.pause();
                    setTimeout(() => {
                      setIsUserSpeaking(true);
                      // setIsVideoRendering(false);
                      setSuperText("");
                      openMic();
                      startRecording();
                    }, 500);
                  }}
                  className="h-[84px]"
                  src="/images/stop.png"
                  alt="mic image"
                />

                <img
                  onClick={() => navigate("/explore-your-experience")}
                  className="h-11"
                  src="/svgs/close.svg"
                  alt="close image"
                />
              </div>
            )}
          </div>
          <div
            className={`flex flex-col ${
              isUserSpeaking ? "gap-y-28" : "gap-y-4"
            }`}
          >
            {isUserSpeaking ? (
              <div className="botIsListening flex flex-col gap-y-8">
                <h1 className="px-6 font-Poppins text-[19px] font-semibold leading-[22.8px] text-center text-white">
                  {message ||
                    " Hey, I'm Sensodyne Interactive Demo, Let me know how I can help"}
                </h1>

                <div className="flex flex-col items-center gap-8 w-full ">
                  <div className="w-full  h-36 flex  items-center justify-center  ">
                    <div
                      onClick={() => {
                        !isAPIStillCalling && setIsUserSpeaking(true);
                        openMic();
                        startRecording();
                      }}
                      className="relative w-28 h-28 overflow-hidden border-4 border-white rounded-full"
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
                <div className="w-full flex flex-col gap-y-14 items-center">
                  <div
                    onClick={() => {
                      !isAPIStillCalling && setIsUserSpeaking(true);
                      openMic();
                      startRecording();
                    }}
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
              )
            )}

            <div className="flex flex-col gap-y-6">
              {/* {!isUserSpeaking && (
                <img
                  className={`
                    ${
                      !isUserSpeaking && !isVideoRendering && superText
                        ? "hidden"
                        : ""
                    }
                   max-w-[294px] w-[87%] mx-auto`}
                  src="/images/paint-box-collage.png"
                  alt=""
                />
              )} */}

              <div className="absolute bottom-9 left-1/2 -translate-x-1/2">
                <img
                  className="h-[33px] lg:h-10  self-center"
                  src="/images/powered-by-hivoco.png"
                  alt="powered-by-hivoco image"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IOSInteraction;
