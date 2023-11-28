import React, { useState } from "react";
import Countdown from "./Countdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPause } from "@fortawesome/free-solid-svg-icons";

const StudyTime = ({ studyDuration }) => {
  const [studyEnded, setStudyEnded] = useState(false);
  // take the redux breaks array state 
  const handleCountdownEnded = () => {
    setStudyEnded(true);
    // todo: swap to the studyTime component
  };
  const handlePauseClick = () => {
    handleCountdownEnded();
    // todo: modify the breaks array
  };
  return (
    <div className="bg-purple-500 rounded-lg p-8 text-center w-4/5 h-3/5 flex flex-col items-center justify-center h-screen w-100 gap-4">
      <div className="flex items-center justify-center h-screen w-100 gap-4">
        <h2 className="text-5xl font-bold m-7 ">Study Time</h2>
        <button
          className="bg-white text-purple-500 rounded p-4 w-30 focus:outline-none"
          onClick={handlePauseClick}
        >
          <FontAwesomeIcon icon={faPause} size="xl" />
        </button>
      </div>
      <Countdown
        timeObject={studyDuration}
        onCountdownEnd={handleCountdownEnded}
      />
    </div>
  );
};

export default StudyTime;
