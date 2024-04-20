import { sendSessionData } from "../apis/sessionData";

const sampleSessionData = {
  sessionDuration: {
    hours: 1,
    minutes: 30,
    seconds: 45,
  },
  sessionIntervals: [
    {
      hours: 0,
      minutes: 15,
      seconds: 30,
      type: "break",
    },
    {
      hours: 0,
      minutes: 30,
      seconds: 0,
      type: "study",
    },
  ],
  sessionStartedTimestamp: "2023-11-17T12:30:00Z",
  sessionEndedTimestamp: "2023-11-17T14:00:00Z",
  sessionIndex: 1,
  musicFrequencyArray: [1, 0, 1, 0, 1, 0],
};

// Call sendSessionData when the session ends
sendSessionData(sampleSessionData)
  .then((response) => {
    console.log("Session data sent successfully:", response);
  })
  .catch((error) => {
    console.error("Error sending session data:", error);
  });
