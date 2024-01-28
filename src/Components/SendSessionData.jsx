import { useMutation } from "@apollo/client";
import { SEND_SESSION_DATA_MUTATION } from "./../../graphql/mutations";
import { useSelector } from "react-redux";
const [sendSessionData] = useMutation(SEND_SESSION_DATA_MUTATION);
const sessionIntervals = useSelector((state) => state.sessionIntervals);
const sessionDuration = useSelector((state) => state.sessionDuration);
const breaks = useSelector((state) => state.breaks);

const sessionData = {
  sessionIntervals: sessionIntervals,
  sessionDuration: sessionDuration,
  breaks: breaks,
  endTime,
  startTime,
  intervalSwitchArray,
  pauseTimeArray,
  resumeTimeArray,
};

const handleSessionEnd = () => {
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
