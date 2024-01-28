import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { SEND_SESSION_DATA_MUTATION } from "./../graphql/mutations";
import { useSelector } from "react-redux";

const SendSessionData = ({ endTime, intervalSwitchTime, pauseTime, resumeTime }) => {
  const [sendSessionData] = useMutation(SEND_SESSION_DATA_MUTATION);
  const sessionIntervals = useSelector((state) => state.sessionIntervals);
  const sessionDuration = useSelector((state) => state.sessionDuration);
  const breakslice = useSelector((state) => state.breakslice);
  const sessionStartTime = useSelector((state) => state.sessionStartTime);

  const [sessionData, setSessionData] = useState({
    startTime: sessionStartTime,
    sessionIntervals: sessionIntervals,
    sessionDuration: sessionDuration,
    breaks: breakslice,
    endTime: endTime,
    intervalSwitchArray: intervalSwitchTime,
    pauseTimeArray: pauseTime,
    resumeTimeArray: resumeTime,
  });

  useEffect(() => {
    // Check if all required values are available
    if (
      sessionStartTime &&
      sessionIntervals.length > 0 &&
      sessionDuration &&
      breakslice &&
      endTime &&
      intervalSwitchTime.length > 0 &&
      pauseTime.length > 0 &&
      resumeTime.length > 0
    ) {
      // handleSessionDataSend();
      console.log(sessionData)
    }
  }, [sessionData]);

  const handleSessionDataSend = () => {
    sendSessionData({
      variables: {
        sessionData: sessionData,
      },
    })
      .then((response) => {
        console.log("Session data sent successfully:", response);
      })
      .catch((error) => {
        console.error("Error sending session data:", error);
      });
  };

  return <></>;
};

export default SendSessionData;
