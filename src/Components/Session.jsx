import React, { useState } from "react";
import SessionStarted from "./SessionComponents/SessionStarted";
import SessionCompleted from "./SessionComponents/SessionCompleted";
import SessionEnded from "./SessionComponents/SessionEnded";
import SendSessionData from "./SendSessionData";

const Session = () => {
  const [sessionCompleted, setSessionCompleted] = useState(false);
  const [sessionEnded, setSessionEnded] = useState(false);

  // states to send to backend after session complete
  const [intervalSwitchTime, setIntervalSwitchTime] = useState([]);
  const [pauseTime, setPauseTime] = useState([]);
  const [resumeTime, setResumeTime] = useState([]);

  const handleSendSessionData = (endTime, intervalSwitchTime, pauseTime, resumeTime) => {
    return (
      <SendSessionData
        endTime={endTime}
        intervalSwitchTime={intervalSwitchTime}
        pauseTime={pauseTime}
        resumeTime={resumeTime}
      />
    );
  };

  const handleSessionCompleted = () => {
    setSessionCompleted(true);
  };

  const handleSessionEnded = () => {
    setSessionEnded(true);
  };

  return (
    <div className="flex items-center justify-center h-screen w-100">
      {sessionEnded ? (
        <>
          <SessionEnded />
          {handleSendSessionData(Date.now(), intervalSwitchTime, pauseTime, resumeTime)}
        </>
      ) : sessionCompleted ? (
        <>
          <SessionCompleted />
          {handleSendSessionData(Date.now(), intervalSwitchTime, pauseTime, resumeTime)}
        </>
      ) : (
        <SessionStarted
          handleSessionCompleted={handleSessionCompleted}
          handleSessionEnded={handleSessionEnded}
          setIntervalSwitchTime={setIntervalSwitchTime}
          setPauseTime={setPauseTime}
          setResumeTime={setResumeTime}
        />
      )}
    </div>
  );
};

export default Session;
