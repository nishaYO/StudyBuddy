import React, { useState } from "react";
import StudyTime from "./StudyTime";
import BreakTime from "./BreakTime";
import { setSessionIntervals } from "./../../redux/sessionIntervals";
import { useDispatch, useSelector } from "react-redux";

const SessionStarted = ({ handleSessionCompleted }) => {
  const addLastSessionInterval = () => {
    // sample sessionInterval
    // [
    // {hours: '1', minutes: '6', seconds: '0', type: 'study'}
    // {hours: '0', minutes: '1', seconds: '0', type: 'break'}
    // {hours: '0', minutes: '32', seconds: '0', type: 'study'}
    // {hours: '0', minutes: '1', seconds: '0', type: 'break'}
    // ]

    // total duration of all existing intervals
    const totalIntervalDuration = sessionIntervals.reduce(
      (acc, interval) => {
        return {
          hours: acc.hours + parseInt(interval.hours),
          minutes: acc.minutes + parseInt(interval.minutes),
          seconds: acc.seconds + parseInt(interval.seconds),
        };
      },
      { hours: 0, minutes: 0, seconds: 0 }
    );
    console.log("totalIntervalDuration", totalIntervalDuration);
    // last interval duration = total Session Duration - total intervals duration
    const lastIntervalDuration = {
      hours: String(sessionDuration.hours - totalIntervalDuration.hours),
      minutes: String(sessionDuration.minutes - totalIntervalDuration.minutes),
      seconds: String(sessionDuration.seconds - totalIntervalDuration.seconds),
    };

    const lastInterval = {
      ...lastIntervalDuration,
      type: "study",
    };

    dispatch(setSessionIntervals([...sessionIntervals, lastInterval]));
  };
  const dispatch = useDispatch();
  const sessionIntervals = useSelector((state) => state.sessionIntervals);
  const sessionDuration = useSelector((state) => state.sessionDuration);
  const breaks = useSelector((state) => state.breaks);
  console.log("Session intervals:", sessionIntervals);
  console.log("Session Duration:", sessionDuration);
  if (sessionIntervals.length != breaks.length * 2 + 1) {
    addLastSessionInterval();
  }

  const [counter, setCounter] = useState(0);
  const currentSessionInterval = sessionIntervals[counter];
  console.log(sessionIntervals);
  const [isStudyTime, setIsStudyTime] = useState(
    currentSessionInterval.type == "study" ? true : false
  );

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
        <StudyTime
          studyDuration={duration}
          onStudyDurationEnd={onDurationEnd}
        />
      ) : (
        <BreakTime
          breakDuration={duration}
          onBreakDurationEnd={onDurationEnd}
        />
      )}
    </div>
  );
};

export default SessionStarted;
