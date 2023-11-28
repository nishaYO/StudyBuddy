import { setSessionIntervals } from "../redux/sessionIntervals";
import { useDispatch, useSelector } from "react-redux";

const addSessionIntervals = (y, defaultBreakDuration) => {
  const dispatch = useDispatch();
  const sessionIntervals = useSelector((state) => state.sessionIntervals);

  const studyDuration = ConvertPixelToTime({ totalMinutes: y });
  let newSessionIntervals = [];
  const studyInterval = {
    hours: studyDuration.hours,
    minutes: studyDuration.minutes,
    seconds: studyDuration.seconds,
    type: "study",
  };
  const breakInterval = {
    hours: "0",
    minutes: defaultBreakDuration,
    seconds: "0",
    type: "break",
  };
  if (y === 0) {
    newSessionIntervals = [breakInterval];
  } else {
    newSessionIntervals = [studyInterval, breakInterval];
  }
  dispatch(setSessionIntervals([...sessionIntervals, newSessionIntervals]));
};

const addLastSessionInterval = () => {
  const dispatch = useDispatch();
  const sessionIntervals = useSelector((state) => state.sessionIntervals);
  const sessionDuration = useSelector((state) => state.sessionDuration);

  // total duration of all existing intervals
  const totalIntervalDuration = sessionIntervals.reduce(
    (acc, interval) => {
      return {
        hours: acc.hours + parseInt(interval[0].hours),
        minutes: acc.minutes + parseInt(interval[0].minutes),
        seconds: acc.seconds + parseInt(interval[0].seconds),
      };
    },
    { hours: 0, minutes: 0, seconds: 0 }
  );

  // last interval duration = total Session Duration - total intervals duration
  const lastIntervalDuration = {
    hours: sessionDuration.hours - totalIntervalDuration.hours,
    minutes: sessionDuration.minutes - totalIntervalDuration.minutes,
    seconds: sessionDuration.seconds - totalIntervalDuration.seconds,
  };

  const lastInterval = {
    ...lastIntervalDuration,
    type: "study",
  };

  dispatch(setSessionIntervals([...sessionIntervals, [lastInterval]]));
};

export { addLastSessionInterval, addSessionIntervals };
