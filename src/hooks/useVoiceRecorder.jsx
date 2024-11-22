import React, { useEffect, useRef, useState } from "react";
import { AudioRecorder, useAudioRecorder } from "react-audio-voice-recorder";

function useVoiceRecorder() {
  const startRecordingButtonRef = useRef();
  const stopRecordingButtonRef = useRef();
  const {
    startRecording,
    stopRecording,
    togglePauseResume,
    recordingBlob,
    isRecording,
    isPaused,
    recordingTime,
    mediaRecorder,
  } = useAudioRecorder();

  const InVisible = (
    <div className="invisible">
      <AudioRecorder
        audioTrackConstraints={{
          noiseSuppression: true,
          echoCancellation: true,
        }}
        downloadOnSavePress={false}
        downloadFileExtension="webm"
      />

      <button ref={startRecordingButtonRef} onClick={() => startRecording()}>
        Start Recording
      </button>
      <button ref={stopRecordingButtonRef} onClick={() => startRecording()}>
        Stop Recording
      </button>
    </div>
  );

  return {
    startRecordingButtonRef,
    stopRecordingButtonRef,
    startRecording,
    stopRecording,
    togglePauseResume,
    recordingBlob,
    isRecording,
    isPaused,
    recordingTime,
    mediaRecorder,
    InVisible,
  };
}

export default useVoiceRecorder;
