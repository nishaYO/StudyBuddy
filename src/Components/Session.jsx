import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import SessionStarted from "./SessionComponents/SessionStarted";
import SessionCompleted from "./SessionComponents/SessionCompleted";
import SessionEnded from "./SessionComponents/SessionEnded";
import { SEND_SESSION_DATA_MUTATION } from "./../graphql/mutations";
import { useSelector } from "react-redux";

const Session = () => {
  const [sessionCompleted, setSessionCompleted] = useState(false);
  const [sessionEnded, setSessionEnded] = useState(false);

  // states to send to backend after session complete
  const [intervalSwitchTime, setIntervalSwitchTime] = useState([]);
  const [pauseTime, setPauseTime] = useState([]);
  const [resumeTime, setResumeTime] = useState([]);

  // get redux states to send to backend
  const sessionIntervals = useSelector((state) => state.sessionIntervals);
  const sessionDuration = useSelector((state) => state.sessionDuration);
  const breaks = useSelector((state) => state.breaks);
  const sessionStartTime = useSelector((state) => state.sessionStartTime);

  const [sendSessionData] = useMutation(SEND_SESSION_DATA_MUTATION);

  const handleSessionCompleted = async () => {
    setSessionCompleted(true);
    await sendSessionDataToServer();
  };

  const handleSessionEnded = async () => {
    setSessionEnded(true);
    await sendSessionDataToServer();
  };

  const sendSessionDataToServer = async () => {
    try {
      const endTime = Date.now();

      const sessionData = {
        startTime: sessionStartTime,
        sessionIntervals: sessionIntervals,
        sessionDuration: sessionDuration,
        breaks: breaks,
        endTime: endTime,
        intervalSwitchArray: intervalSwitchTime,
        pauseTimeArray: pauseTime,
        resumeTimeArray: resumeTime,
      };
      console.log("sessionData", sessionData);
      await sendSessionData({
        variables: {
          sessionData: sessionData,
        },
      });

      console.log("Session data sent successfully");
    } catch (error) {
      console.error("Error sending session data:", error);
    }
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
          setIntervalSwitchTime={setIntervalSwitchTime}
          setPauseTime={setPauseTime}
          setResumeTime={setResumeTime}
        />
      )}
    </div>
  );
};

export default Session;
