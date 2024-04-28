import React from "react";
import Countdown from "./Countdown";

const StudyTime = ({ studyDuration, onStudyDurationEnd, isPaused }) => {
  const handleCountdownEnded = () => {
    onStudyDurationEnd();
  };
  const handleSkipClick = () => {
    handleCountdownEnded();
  };

  return (
    <div className="bg-purple-500 rounded-lg p-8 text-center w-[600px] h-[400px] flex flex-col items-center justify-center gap-4">
      <div className="flex items-center justify-center h-screen gap-4">
        <h2 className="text-5xl font-bold m-7 ">Study Time</h2>
        {/* exclude from prod */}
        <button
          className="bg-white text-black-500 font-bold rounded p-4 w-30 focus:outline-none"
          onClick={handleSkipClick}
        >
          Skip{" "}
        </button>
      </div>
      <Countdown
        initialDuration={studyDuration}
        onCountdownEnd={handleCountdownEnded}
        isPaused={isPaused}
      />
    </div>
  );
};

export default StudyTime;
