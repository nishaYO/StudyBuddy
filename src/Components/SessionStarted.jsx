import React, { useState, useEffect } from "react";
// const sessionIntervals = [
//   { hours: 0, minutes: 0, seconds: 12, type: 'study'},
//   { hours: 0, minutes: 0, seconds: 5, type: 'break'},
//   { hours: 0, minutes: 0, seconds: 20, type: 'study'},
//   { hours: 0, minutes: 0, seconds: 10, type: 'break'},
//   { hours: 0, minutes: 0, seconds: 13, type: 'study'},
// ];
function StudyTime({ sessionIntervals, sessionIndex, setSessionIndex }) {
  const [studyDuration, setStudyDuration] = useState(sessionIntervals[sessionIndex]);

  useEffect(() => {
    const studyTimer = setInterval(() => {
      setStudyDuration((prevDuration) => {
        if (prevDuration.hours === 0 && prevDuration.minutes === 0 && prevDuration.seconds === 0) {
          clearInterval(studyTimer);
          setSessionIndex((prevIndex) => prevIndex + 1);
        } else if (prevDuration.seconds === 0) {
          return { hours: prevDuration.hours - 1, minutes: prevDuration.minutes, seconds: 59 };
        } else {
          return { ...prevDuration, seconds: prevDuration.seconds - 1 };
        }
      });
    }, 1000);

    return () => clearInterval(studyTimer);
  }, [sessionIndex]);

  return (
    <div>
      <p>Study Timer: {studyDuration.hours} hours, {studyDuration.minutes} mins, {studyDuration.seconds} seconds</p>
    </div>
  );

}

function BreakTime({sessionIntervals, sessionIndex}) {
  const [breakDuration, setBreakDuration] = useState(4)
  return <div>BreakTimer: {breakDuration}</div>;
}

function SessionStarted({ sessionIntervals, sessionDuration}) {
  const [sessionIndex, setSessionIndex] = useState(0);

  const [study, setStudy] = useState(true);
  useEffect(() => {
    // Update the study state based on the current session type
    setStudy(sessionIntervals[sessionIndex].type === "study");
  }, [sessionIndex]);

  return (
    <div className="m-5">
      <div className="bg-white flex flex-col items-center w-full lg:w-1/2 p-5 m-4 border-2 rounded-lg border-[#BEADFA] shadow-lg">
        <p>SessionDuration: {sessionDuration.hours} hours, {sessionDuration.minutes} minutes, {sessionDuration.seconds} seconds</p>
      </div>
      {study ? <StudyTime sessionIntervals={sessionIntervals} sessionIndex={sessionIndex} setSessionIndex={setSessionIndex} /> : <BreakTime  sessionIntervals={sessionIntervals} sessionIndex={sessionIndex} setSessionIndex={setSessionIndex} />}
    </div>
  );
}

export default SessionStarted;
