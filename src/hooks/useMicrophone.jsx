// useMicrophone.js
import { useRef, useEffect } from "react";

export const useMicrophone = () => {
  const micOpenSound = useRef(new Audio("/sounds/startmic.wav")); // Replace with correct path
  const micOffSound = useRef(new Audio("/sounds/endmic.wav")); // Replace with correct path
  const mediaStreamRef = useRef(null);

  // Set volume when component mounts
  useEffect(() => {
    if (micOpenSound.current && micOffSound.current) {
      micOpenSound.current.volume = 0.1;
      micOffSound.current.volume = 0.1;
    }
  }, []); // Empty dependency array means this runs once when component mounts

  // Function to open the microphone
  const openMic = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStreamRef.current = stream;
      micOpenSound.current.play(); // Play mic open sound
      console.log("Mic opened");
    } catch (err) {
      console.error("Error opening microphone:", err);
    }
  };

  // Function to close the microphone
  const closeMic = () => {
    if (mediaStreamRef.current) {
      const tracks = mediaStreamRef.current.getTracks();
      tracks.forEach((track) => track.stop()); // Stop all tracks to turn off the mic
      micOffSound.current.play(); // Play mic off sound
      console.log("Mic closed");
    }
  };

  return { openMic, closeMic };
};
