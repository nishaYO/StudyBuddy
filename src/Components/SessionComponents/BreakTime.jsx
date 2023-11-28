import React, { useState } from "react";
import Countdown from "./Countdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";

const BreakTime = ({ breakDuration }) => {
  const [breakEnded, setBreakEnded] = useState(false);
  const handleCountdownEnded = () => {
    setBreakEnded(true);
    // todo: swap to the studyTime component
  };

  const handlePlayClick = () => {
    handleCountdownEnded();
    // todo: modify the breaks array
  };

  return (
    <div className="bg-purple-500 rounded-lg p-8 text-center w-4/5 h-3/5 flex flex-col items-center justify-center h-screen w-100 gap-4">
      <div className="flex items-center justify-center h-screen w-100 gap-4">
        <h2 className="text-5xl font-bold m-7 ">Break Time</h2>
        <button
          className="bg-white text-purple-500 rounded p-4 w-30 focus:outline-none"
          onClick={handlePlayClick}
        >
          <FontAwesomeIcon icon={faPlay} size="xl" />
        </button>
      </div>
      <Countdown
        timeObject={breakDuration}
        onCountdownEnd={handleCountdownEnded}
      />
    </div>
  );
};

export default BreakTime;
