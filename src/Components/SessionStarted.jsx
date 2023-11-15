import React, { useState, useEffect } from "react";

function SessionStarted({ sessionIntervals, sessionDuration }) {
  const [sessionIndex, setSessionIndex] = useState(0);
  const [currentInterval, setCurrentInterval] = useState(sessionIntervals[sessionIndex]);
  const [countdown, setCountdown] = useState({
    hours: currentInterval.hours,
    minutes: currentInterval.minutes,
    seconds: currentInterval.seconds,
  });

  useEffect(() => {
    const intervalTimer = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown.hours === 0 && prevCountdown.minutes === 0 && prevCountdown.seconds === 0) {
          clearInterval(intervalTimer);
          setSessionIndex((prevIndex) => prevIndex + 1);

          if (sessionIndex < sessionIntervals.length - 1) {
            setCurrentInterval(sessionIntervals[sessionIndex + 1]);
            return {
              hours: sessionIntervals[sessionIndex + 1].hours,
              minutes: sessionIntervals[sessionIndex + 1].minutes,
              seconds: sessionIntervals[sessionIndex + 1].seconds,
            };
          }

          return {};
        } else if (prevCountdown.seconds === 0) {
          return { hours: prevCountdown.hours - 1, minutes: prevCountdown.minutes, seconds: 59 };
        } else {
          return { ...prevCountdown, seconds: prevCountdown.seconds - 1 };
        }
      });
    }, 1000);

    return () => clearInterval(intervalTimer);
  }, [sessionIndex, sessionIntervals]);

  return (
    <div className="m-5">
      <div className="bg-white flex flex-col items-center w-full lg:w-1/2 p-5 m-4 border-2 rounded-lg border-[#BEADFA] shadow-lg">
        <p>
          Session Duration: {sessionDuration.hours} hours, {sessionDuration.minutes} minutes, {sessionDuration.seconds} seconds
        </p>
      </div>
      {currentInterval.type === "study" ? (
        <div>
          <p>Study Time: {countdown.hours} hours, {countdown.minutes} mins, {countdown.seconds} seconds</p>
        </div>
      ) : (
        <div>
          <p>Break Time: {countdown.hours} hours, {countdown.minutes} mins, {countdown.seconds} seconds</p>
        </div>
      )}
    </div>
  );
}

export default SessionStarted;
