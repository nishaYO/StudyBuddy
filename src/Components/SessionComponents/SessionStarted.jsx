import React, { useState } from "react";
import StudyTime from "./StudyTime";
import BreakTime from "./BreakTime";
import NotesForm from "./NotesForm";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocation } from "wouter";
import {
  faVolumeMute,
  faVolumeHigh,
  faVolumeLow,
  faMusic,
} from "@fortawesome/free-solid-svg-icons";

const SessionStarted = ({ handleSessionCompleted, handleSessionEnded }) => {
  const [isPaused, setIsPaused] = useState(false);

  const handlePause = () => {
    setIsPaused(true);
  };

  const handleResume = () => {
    setIsPaused(false);
  };
  const startTime = Date.now();
  console.log(new Date(startTime).toLocaleString());
  const sampleStats = {
    TotalStudyDurationSoFar: "2",
    TimeLeft: "2",
  };

  const formatStats = (stats) => {
    const formattedStats = {};

    // Format each key in stats
    Object.entries(stats).forEach(([key, value]) => {
      const formattedKey = key.replace(/([a-z])([A-Z])/g, "$1 $2"); // Add space between camelCase
      const formattedValue = parseInt(value, 10); // Convert value to integer

      formattedStats[formattedKey] = formattedValue;
    });

    return Object.entries(formattedStats).map(([key, value]) => (
      <div key={key}>
        {key}: {value}
      </div>
    ));
  };

  const stats = formatStats(sampleStats);

  const [location, navigate] = useLocation();
  const sessionIntervals = useSelector((state) => state.sessionIntervals);
  const [counter, setCounter] = useState(0);
  const currentSessionInterval = sessionIntervals[counter];
  // console.log(sessionIntervals);
  const [isStudyTime, setIsStudyTime] = useState(
    currentSessionInterval.type == "study" ? true : false
  );

  const initialDuration = {
    hours: currentSessionInterval.hours,
    minutes: currentSessionInterval.minutes,
    seconds: currentSessionInterval.seconds,
  };
  const [duration, setDuration] = useState(initialDuration);

  const onDurationEnd = () => {
    if (counter === sessionIntervals.length - 1) {
      handleSessionCompleted();
    } else {
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

  // music controls logic
  const [isVolumeMuted, setIsVolumeMuted] = useState(false);

  const handleMusicIconClick = () => {
    navigate("/edit-session");
  };

  const handleVolumeIconClick = () => {
    setIsVolumeMuted((prev) => !prev);
  };

  const handleVolumeControlDotMove = (event) => {
    const dotPosition = event.clientX;
    // console.log("Volume control dot moved to:", dotPosition);
  };

  // notes logic
  const [showNotes, setShowNotes] = useState(false);

  const handleEndSessionClick = () => {
    handleSessionEnded();
  };

  // whenever ispuase is false the

  return (
    <div className="w-4/5 h-4/5 flex flex-col items-center justify-center h-screen w-100 gap-10">
      {/* upper tray */}
      <div className=" p-3 flex flex-row items-center justify-center gap-10 w-screen">
        <div className="flex justify-between p-4 bg-gray-800 text-white">
          {/* Music icon button */}
          <button className="mr-4" onClick={handleMusicIconClick}>
            <FontAwesomeIcon icon={faMusic} size="lg" />
          </button>

          {/* Volume control icon */}
          <button className="mr-4" onClick={handleVolumeIconClick}>
            <FontAwesomeIcon
              icon={isVolumeMuted ? faVolumeMute : faVolumeHigh}
              size="lg"
            />
          </button>

          {/* Volume control horizontal line with dot */}
          <div className="relative" onMouseMove={handleVolumeControlDotMove}>
            <div className="h-2 w-24 bg-gray-600 rounded-full mx-2 mt-1">
              {/* Dot for volume control */}
              <div className="absolute h-4 w-4 bg-white rounded-full top-0 transform -translate-x-1/2 -translate-y-1/2"></div>
            </div>
          </div>
        </div>
      </div>
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
          {showNotes ? (
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
          )}
        </div>
      </div>

      {/* bottom tray */}
      <div className=" p-3 flex flex-row items-center justify-center gap-10 w-screen">
        <button
          onClick={handleEndSessionClick}
          className="bg-purple-500 text-white px-4 py-2 rounded"
        >
          End session
        </button>
        <button onClick={handlePause}
          className="bg-purple-500 text-white px-4 py-2 rounded"
        >
          Pause session
        </button>
        {/* stats of the current session */}
        <div className="bg-purple-400 p-2 rounded w-[400px] flex flex-row items-center justify-center gap-10">
          {stats}
        </div>
      </div>
      {isPaused ? (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded shadow-md text-center  w-[400px]  h-[160px]">
            <p className="mb-4 text-2xl font-bold">Session Paused</p>
            <button
              onClick={handleResume}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Resume
            </button>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default SessionStarted;
