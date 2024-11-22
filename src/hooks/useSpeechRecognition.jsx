import { useEffect, useState } from "react";

const useSpeechRecognition = () => {
  const [recognition, setRecognition] = useState(null);
  const [speechText, setSpeechText] = useState("start interactivedemos");

  const [hasRecognitionEnded, setHasRecognitionEnded] = useState(false);

  const handleSpeechResult = (e) => {
    const transcript = Array.from(e.results)
      .map((result) => result[0])
      .map((result) => result.transcript)
      .join("");
    setSpeechText(transcript);
  };

  const handleSpeechEnd = (e) => {
    e.stopImmediatePropagation();
    setHasRecognitionEnded(true);
  };

  const startSpeechRecognition = () => {
    recognition?.start();
  };

  const stopSpeechRecognition = () => {
    recognition?.stop();
  };

  useEffect(() => {
    const speechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition ||
      window.mozSpeechRecognition ||
      window.msSpeechRecognition;

    const recognition1 = new speechRecognition();
    recognition1.interimResults = true;
    // recognition1.continuous = true;

    recognition1.maxAlternatives = 20; // Corrected typo here
    recognition1.lang = "en-IN";
    // recognition1.lang = "hi-IN";

    setRecognition(recognition1);

    recognition1.addEventListener("result", handleSpeechResult);
    recognition1.addEventListener("end", handleSpeechEnd);

    return () => {
      recognition1.removeEventListener("result", handleSpeechResult);
      recognition1.removeEventListener("end", handleSpeechEnd);
    };
  }, []);

  return {
    recognition,
    speechText,
    setSpeechText,
    startSpeechRecognition,
    stopSpeechRecognition,
    handleSpeechEnd,
    hasRecognitionEnded,
    setHasRecognitionEnded,
  };
};

export default useSpeechRecognition;
