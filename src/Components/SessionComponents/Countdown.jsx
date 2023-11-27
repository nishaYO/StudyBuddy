import React, { useEffect, useState } from "react";

const Countdown = ({ timeObject }) => {
  const { hours, minutes, seconds } = timeObject;
  const initialTimeInSeconds =
    parseInt(hours) * 3600 + parseInt(minutes) * 60 + parseInt(seconds);

  const [timeRemaining, setTimeRemaining] = useState(initialTimeInSeconds);
  console.log("timeObject: ",timeObject);
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining((prevTime) => {
        if (prevTime > 0) {
          return prevTime - 1;
        } else {
          clearInterval(interval); // Stop the interval when time reaches 0
          console.log("Countdown reached zero!");
          return 0;
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (time) => {
    const pad = (num) => (num < 10 ? `0${num}` : num);
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  };

  return <div className="text-4xl font-bold">{formatTime(timeRemaining)}</div>;
};

export default Countdown;
