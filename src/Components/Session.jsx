import React, { useState, useEffect } from "react";
import { useLocation } from "wouter";
import SessionStarted from "./SessionStarted";
import SessionEnded from "./SessionEnded";

const sessionIntervals = [
  { hours: 0, minutes: 0, seconds: 12, type: 'study'},
  { hours: 0, minutes: 0, seconds: 4, type: 'break'}, // -1 from each element's seconds is done deliberately as switching to and rendering next element consumes one 1 each time.
  { hours: 0, minutes: 0, seconds: 19, type: 'study'},
  { hours: 0, minutes: 0, seconds: 9, type: 'break'},
  { hours: 0, minutes: 0, seconds: 12, type: 'study'},
];

function Session() {
  const [sessionDuration, setSessionDuration] = useState({ hours: 0, minutes: 1, seconds: 0 });
  const [location, navigate] = useLocation();
  const [sessionEnded, setSessionEnded] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setSessionDuration((prevDuration) => {
        const newDuration = { ...prevDuration };

        if (newDuration.hours === 0 && newDuration.minutes === 0 && newDuration.seconds === 0) {
          clearInterval(timer);
          setSessionEnded(true);
        } else if (newDuration.seconds === 0) {
          newDuration.minutes -= 1;
          newDuration.seconds = 59;
        } else {
          newDuration.seconds -= 1;
        }

        return newDuration;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="m-5">
      <button
        className="bg-[#D0BFFF] text-white px-4 py-2 m-2 rounded"
        onClick={() => navigate('/')}
      >
        Back
      </button>
      <div className="bg-white flex flex-col items-center w-full lg:w-1/2 p-5 m-4 border-2 rounded-lg border-[#BEADFA] shadow-lg">
        hello, this is the session page
      </div>
      <div>
        {sessionEnded ? (
          <SessionEnded />
        ) : (
          <SessionStarted sessionIntervals={sessionIntervals} sessionDuration={sessionDuration}/>
        )}
      </div>
    </div>
  );
}

export default Session;
