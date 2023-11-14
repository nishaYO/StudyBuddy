import React, { useState, useEffect } from "react";
import { useLocation } from "wouter";
import SessionStarted from "./SessionStarted";
import SessionEnded from "./SessionEnded";

const sessionIntervals = [
  { hours: 0, minutes: 0, seconds: 12, type: 'study'},
  { hours: 0, minutes: 0, seconds: 5, type: 'break'},
  { hours: 0, minutes: 0, seconds: 20, type: 'study'},
  { hours: 0, minutes: 0, seconds: 10, type: 'break'},
  { hours: 0, minutes: 0, seconds: 13, type: 'study'},
];

// if any activity on this website, except for countdown, like sessionindex change, reload by user, session ended, back button clicked, webiste closed then teh data should go to the backend

// user event, session end, back button click => send data to backend

// data to be sent=> sessionDuration and sessionIntervals and sessionStartedTimestamp and sessionEndedTimestamp; 

function Session() {
  const [sessionDuration, setSessionDuration] = useState({ hours: 0, minutes: 1, seconds: 0 });
  const [sessionIndex, setSessionIndex] = useState(2);
  const [location, navigate] = useLocation();
  const sessionEnded = sessionDuration.hours === 0 && sessionDuration.minutes === 0 && sessionDuration.seconds === 0;
  
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
          <SessionStarted sessionIntervals={sessionIntervals} sessionIndex={sessionIndex} />
        )}
      </div>
    </div>
  );
}

export default Session;