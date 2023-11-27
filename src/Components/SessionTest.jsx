import React, { useState, useEffect } from "react";
import SessionStarted from "./SessionComponents/SessionStarted";
import SessionCompleted from "./SessionComponents/SessionCompleted";

const SessionTest = () => {
  const [sessionCompleted, setSessionCompleted] = useState(false);

  const handleSessionCompleted = () => {
    setSessionCompleted(true);
  };

  return (
    <div className="flex items-center justify-center h-screen w-100">
      {sessionCompleted ? (
        <SessionCompleted />
      ) : (
        <SessionStarted handleSessionCompleted={handleSessionCompleted} />
      )}
    </div>
  );
};

export default SessionTest;
