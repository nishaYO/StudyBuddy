import React, { useState } from "react";
import { useSelector } from "react-redux";
import StudyTime from "./StudyTime";
import BreakTime from "./BreakTime";
import { useSelector } from "react-redux";

const SessionStarted = ({ handleSessionCompleted }) => {
  const sessionIntervals = useSelector((state) => state.sessionIntervals);
  const currentSessionInterval = sessionIntervals[counter];
  const [isStudyTime, setIsStudyTime] = useState(
    currentSessionInterval.type == "study" ? true : false
  );

  const [counter, setCounter] = useState(0);
  const initialDuration = {
    hours: currentSessionInterval.hours,
    minutes: currentSessionInterval.minutes,
    seconds: currentSessionInterval.seconds,
  };
  const [duration, setDuration] = useState(initialDuration);

  const onDurationEnd = () => {
    if (counter === sessionIntervals.length - 1) {
      handleSessionCompleted();
    } else {
      setCounter(counter + 1);
  
      const nextSessionInterval = sessionIntervals[counter + 1];
      const nextDuration = {
        hours: nextSessionInterval.hours,
        minutes: nextSessionInterval.minutes,
        seconds: nextSessionInterval.seconds,
      };
  
      setDuration(nextDuration);
      setIsStudyTime(nextSessionInterval.type === "study");
    }
  };
  

  return (
    <div className="w-4/5 h-4/5 flex items-center justify-center h-screen w-100">
      {isStudyTime ? (
        <StudyTime studyDuration={duration} onStudyDurationEnd={onDurationEnd}/>
      ) : (
        <BreakTime breakDuration={duration} onBreakDurationEnd={onDurationEnd}/>
      )}
    </div>
  );
};

export default SessionStarted;
