import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp, faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { setSessionDuration } from "../../redux/sessionDuration";
import { useDispatch, useSelector } from "react-redux";

function SetTimer() {
  const sessionDuration = useSelector((state) => state.sessionDuration);
  const dispatch = useDispatch();

  // Update Redux state when input values change
  const handleSessionDurationChange = (newHours, newMinutes) => {
    dispatch(setSessionDuration({ hours: newHours, minutes: newMinutes, seconds: 0 }));
  };

  return (
    <div className="flex flex-col justify-center">
      <p className="text-xl text-center lg:text-3xl font-bold mb-4">Set The Session Duration</p>
      <TimeDialer
        hours={sessionDuration.hours}
        minutes={sessionDuration.minutes}
        onSessionDurationChange={handleSessionDurationChange}
      />
      <div className="text-lg bg-[#D0BFFF] p-3 rounded-md shadow-sm m-2">
        The session will end after
        {` ${sessionDuration.hours} hours ${sessionDuration.minutes} mins.`}
      </div>
    </div>
  );
}

const TimeDialer = ({ hours, minutes, onSessionDurationChange }) => {
  // arrow handler functions
  const handleHrsUp = () => {
    onSessionDurationChange((hours + 1) % 24, minutes);
  };

  const handleHrsDown = () => {
    onSessionDurationChange(hours === 0 ? 23 : hours - 1, minutes);
  };

  const handleMinsUp = () => {
    onSessionDurationChange(hours, (minutes + 1) % 60);
  };

  const handleMinsDown = () => {
    onSessionDurationChange(hours, minutes === 0 ? 59 : minutes - 1);
  };

  // type in input box handlers
  const handleHoursInputChange = (e) => {
    const typedHours = parseInt(e.target.value);
    if (!isNaN(typedHours)) {
      onSessionDurationChange(typedHours % 24, minutes);
    }
  };

  const handleMinutesInputChange = (e) => {
    const typedMinutes = parseInt(e.target.value);
    if (!isNaN(typedMinutes)) {
      onSessionDurationChange(hours, typedMinutes % 60);
    }
  };
/*
  handleHoursInputChange fucntion to change hour
*/
  return (
    <div className="flex space-x-4 bg-[#D0BFFF] p-5 rounded-md shadow-sm m-2">
      <div className="flex flex-col items-center">
        <p className="text-lg">hrs</p>
        <button className="text-2xl" onClick={handleHrsUp}>
          <FontAwesomeIcon icon={faAngleUp} />
        </button>
        <input
          className="text-lg w-10 border border-gray-400 rounded p-1"
          type="number"
          value={hours.toString().padStart(2, "0")}
          onChange={handleHoursInputChange}
          onBlur={handleHoursInputChange}
        />
        <button className="text-2xl" onClick={handleHrsDown}>
          <FontAwesomeIcon icon={faAngleDown} />
        </button>
      </div>
      <div className="flex flex-col items-center">
        <p className="text-lg">mins</p>
        <button className="text-2xl" onClick={handleMinsUp}>
          <FontAwesomeIcon icon={faAngleUp} />
        </button>
        <input
          className="text-lg w-10 border border-gray-400 rounded p-1"
          type="number"
          value={minutes.toString().padStart(2, "0")}
          onChange={handleMinutesInputChange}
          onBlur={handleMinutesInputChange}
        />
        <button className="text-2xl" onClick={handleMinsDown}>
          <FontAwesomeIcon icon={faAngleDown} />
        </button>
      </div>
    </div>
  );
};

export default SetTimer;
