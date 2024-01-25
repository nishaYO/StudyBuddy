import React, { useState } from "react";
import SessionStarted from "./SessionComponents/SessionStarted";
import SessionCompleted from "./SessionComponents/SessionCompleted";
import SessionEnded from "./SessionComponents/SessionEnded";

const Session = () => {
  const [sessionCompleted, setSessionCompleted] = useState(false);
  const [sessionEnded, setSessionEnded] = useState(false);
  let endTime;
  const handleSessionCompleted = () => {
    endTime = Date.now()
    console.log(new Date(endTime).toLocaleString())
    setSessionCompleted(true);
  };
  const handleSessionEnded = () => {
    endTime = Date.now()
    console.log(new Date(endTime).toLocaleString())
    setSessionEnded(true);
  };

  return (
    <div className="flex items-center justify-center h-screen w-100">
      {sessionEnded ? (
        <SessionEnded />
      ) : sessionCompleted ? (
        <SessionCompleted />
      ) : (
        <SessionStarted
          handleSessionCompleted={handleSessionCompleted}
          handleSessionEnded={handleSessionEnded}
        />
      )}
    </div>
  );
};

export default Session;
