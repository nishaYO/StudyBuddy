import React, { useState, useEffect } from "react";
import { setSessionDuration } from "../../redux/sessionDuration";
import { useDispatch, useSelector } from "react-redux";

function SetTimer() {
  const sessionDuration = useSelector((state) => state.sessionDuration);
  const dispatch = useDispatch();

  // Update Redux state when input values change
  const handleSessionDurationChange = (newHours, newMinutes) => {
    dispatch(
      setSessionDuration({ hours: parseInt(newHours), minutes: parseInt(newMinutes), seconds: 0 })
    );
  };

  return (
    <div className="flex flex-col justify-center bg-white p-6 rounded-xl">
      <p className="text-xl text-center lg:text-3xl font-bold mb-4">
        Set The Session Duration
      </p>
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
  return (
    <div>
      <div className="flex items-center justify-center space-x-5">
        {/* hour pannel */}
        <div className="flex flex-col items-center  p-2 h-28 w-28 rounded-lg">
          <p>Hours</p>
          <h3 className="text-3xl font-bold">{hours.toString().padStart(2, "0")}</h3>
          <div className="flex justify-between  space-x-3">
            <button onClick={handleHrsUp} className="h-8 w-8 rounded-full bg-black/10">+</button>
            <button onClick={handleHrsDown} className="h-8 w-8 rounded-full bg-black/10">-</button>
          </div>
        </div>
        <h3 className="text-3xl font-bold">:</h3>
        {/* minute pannel */}
        <div className="flex flex-col items-center justify-center p-2 h-28 w-28 rounded-lg">
          <p>Minutes</p>
          <h3 className="text-3xl font-bold">{minutes.toString().padStart(2, "0")}</h3>
          <div className="flex justify-between  space-x-3">
            <button onClick={handleMinsUp} className="h-8 w-8 rounded-full bg-black/10">+</button>
            <button onClick={handleMinsDown} className="h-8 w-8 rounded-full bg-black/10">-</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SetTimer;
