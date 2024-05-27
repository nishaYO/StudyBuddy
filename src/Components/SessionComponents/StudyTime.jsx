import React,{useState,useEffect} from "react";
import Countdown from "./Countdown";
import EndWarning from "./EndWarning";

const StudyTime = ({ studyDuration, onStudyDurationEnd, isPaused,setIsPaused }) => {
  const handleCountdownEnded = () => {
    onStudyDurationEnd();
  };
  const { hours, minutes, seconds } = studyDuration;
  console.log("getting initial duration", hours, minutes, seconds);
  const initialTimeInSeconds =
    parseInt(hours) * 3600 + parseInt(minutes) * 60 + parseInt(seconds);

  const [timeRemaining, setTimeRemaining] = useState(initialTimeInSeconds);

  const [openEndWarning,setOpenEndWarning]=useState(false);

  const handleSkipClick = () => {
    setIsPaused(true);
    // setOpenEndWarning(true);
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
        onCountdownEnd={handleCountdownEnded}
        isPaused={isPaused}
        timeRemaining={timeRemaining}
        setTimeRemaining={setTimeRemaining}
      />
      {openEndWarning && <EndWarning studyDuration={studyDuration} open={openEndWarning} timeRemaining={timeRemaining} setOpen={setOpenEndWarning}/>}
    </div>
  );
};

export default StudyTime;
