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

  // get user id
  const user = JSON.parse(localStorage.getItem("user"));
  const userID = user.id;

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
        userID: userID,
        startTime: sessionStartTime.toString(), 
        sessionIntervals: sessionIntervals.map(interval => ({
          hours: parseInt(interval.hours, 10),
          minutes: parseInt(interval.minutes, 10),
          seconds: parseInt(interval.seconds, 10),
          type: interval.type,
        })),
        sessionDuration: sessionDuration,
        breaks: breaks,
        endTime: endTime.toString(),
        intervalSwitchArray: intervalSwitchTime.map(String), 
        pauseTimeArray: pauseTime.map(String), 
        resumeTimeArray: resumeTime.map(String), 
      };
      console.log("sessionData", sessionData);
      await sendSessionData({
        variables: {
          input: sessionData,
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
