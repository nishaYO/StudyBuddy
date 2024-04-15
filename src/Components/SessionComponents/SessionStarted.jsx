import React, { useState, useEffect } from "react";
import StudyTime from "./StudyTime";
import BreakTime from "./BreakTime";
import NotesForm from "./NotesForm";
import ConfirmModal from "./ConfirmModal";
import MusicControls from "./MusicControls";
import SessionPaused from "./SessionPaused";
import { useSelector } from "react-redux";

const SessionStarted = ({
  handleSessionCompleted,
  handleSessionEnded,
  setIntervalSwitchTime,
  setPauseTime,
  setResumeTime,
}) => {
  const [showNotes, setShowNotes] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

 // check if study or break interval
  const sessionIntervals = useSelector((state) => state.sessionIntervals);
  const [counter, setCounter] = useState(0);
  const currentSessionInterval = sessionIntervals[counter];
  const [isStudyTime, setIsStudyTime] = useState(
    currentSessionInterval.type == "study" ? true : false
  );

  // get the duration of the current interval
  const initialDuration = {
    hours: currentSessionInterval.hours,
    minutes: currentSessionInterval.minutes,
    seconds: currentSessionInterval.seconds,
  };
  const [duration, setDuration] = useState(initialDuration);

  // logic for interval end or skip
  const onDurationEnd = () => {
    if (counter === sessionIntervals.length - 1) {
      handleSessionCompleted();
    } else {
      // add interval switch time to the intervalswitchtime array
      const timestamp = Date.now();
      setIntervalSwitchTime((prevIntervals) => [...prevIntervals, timestamp]);

      // start next interval
      setCounter(counter + 1);
      const nextSessionInterval = sessionIntervals[counter + 1];
      const nextDuration = {
        hours: nextSessionInterval.hours,
        minutes: nextSessionInterval.minutes,
        seconds: nextSessionInterval.seconds,
      };

      setDuration(nextDuration);
      setIsStudyTime(nextSessionInterval.type === "study");
    }
  };

  const handlePause = () => {
    const timestamp = Date.now();
    setPauseTime((prevIntervals) => [...prevIntervals, timestamp]);
    setIsPaused(true);
  };

  const handleResume = () => {
    const timestamp = Date.now();
    setResumeTime((prevIntervals) => [...prevIntervals, timestamp]);
    setIsPaused(false);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen w-100 gap-10">
      {/* exclude from prod */}
      {/* Upper Tray  */}
      {/* <MusicControls /> */}

      {/* main body */}
      <div className="flex flex-row items-center justify-center">
        <span>
          {isStudyTime ? (
            <StudyTime
              studyDuration={duration}
              onStudyDurationEnd={onDurationEnd}
              isPaused={isPaused}
            />
          ) : (
            <BreakTime
              breakDuration={duration}
              onBreakDurationEnd={onDurationEnd}
              isPaused={isPaused}
            />
          )}
        </span>
        <div className="flex flex-column items-center justify-center">
        {/* exclude from prod */}
          {/* {showNotes ? (
            <NotesForm
              onClose={() => {
                setShowNotes(false);
              }}
            />
          ) : (
            <button
              onClick={() => {
                setShowNotes(true);
              }}
              className="bg-purple-500 text-white px-4 py-2 rounded m-2"
            >
              Take Notes
            </button>
          )} */}
        </div>
      </div>

      {/* bottom tray */}
      <div className=" p-3 flex flex-row items-center justify-center gap-10 w-screen">
      {/* exclude from prod */}
        {/* <button
          onClick={() => {
            setIsConfirmationModalOpen(true);
          }}
          className="bg-purple-500 text-white px-4 py-2 rounded"
        >
          End session
        </button> */}
        <button
          onClick={handlePause}
          className="bg-purple-500 text-white px-4 py-2 rounded"
        >
          Pause session
        </button>
      </div>
      {isPaused ? <SessionPaused onclose={handleResume} /> : <></>}
      {isConfirmationModalOpen && (
        <ConfirmModal
          handleSessionEnded={handleSessionEnded}
          onClose={() => {
            setIsConfirmationModalOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default SessionStarted;
