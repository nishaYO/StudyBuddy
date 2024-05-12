import React, { useState, useEffect } from "react";
import { setSessionDuration } from "../../redux/sessionDuration";
import { useDispatch, useSelector } from "react-redux";

const TimeDialer = ({ hours, minutes, onSessionDurationChange }) => {
  const [inputHours, setInputHours] = useState(hours.toString());
  const [inputMinutes, setInputMinutes] = useState(minutes.toString());
  const handleHrsUp = () => {
    const newHours = (hours + 1) % 24;
    setInputHours(newHours.toString());
    onSessionDurationChange(newHours, minutes);
  };
  
  const handleHrsDown = () => {
    const newHours = hours === 0 ? 23 : hours - 1;
    setInputHours(newHours.toString());
    onSessionDurationChange(newHours, minutes);
  };
  
  const handleMinsUp = () => {
    const newMinutes = (minutes + 1) % 60;
    setInputMinutes(newMinutes.toString());
    onSessionDurationChange(hours, newMinutes);
  };
  
  const handleMinsDown = () => {
    const newMinutes = minutes === 0 ? 59 : minutes - 1;
    setInputMinutes(newMinutes.toString());
    onSessionDurationChange(hours, newMinutes);
  };
  
// Handle input change for hours
const handleHoursInputChange = (e) => {
  const typedHours = e.target.value;
  if (/^\d*$/.test(typedHours)) {
    setInputHours(typedHours); 
    const newHours = parseInt(typedHours) % 24;
    const adjustedHours = newHours < 0 ? 24 + newHours : newHours; 
    onSessionDurationChange(adjustedHours, minutes);
  }
};

// Handle input change for minutes
const handleMinutesInputChange = (e) => {
  const typedMinutes = e.target.value;
  if (/^\d*$/.test(typedMinutes)) {
    setInputMinutes(typedMinutes);
    const newMinutes = parseInt(typedMinutes) % 60;
    const adjustedMinutes = newMinutes < 0 ? 60 + newMinutes : newMinutes; 
    onSessionDurationChange(hours, adjustedMinutes);
  }
};

  return (
    <div>
      <div className="flex items-center justify-center space-x-5">
        {/* Hour panel */}
        <div className="flex flex-col items-center  p-2 h-28 w-28 rounded-lg">
          <p>Hours</p>
          {/* Input box for hours */}
          <input
            type="text"
            value={inputHours}
            onChange={handleHoursInputChange}
            className="text-3xl font-bold w-16 text-center mb-2"
          />
          {/* Buttons for hour adjustment */}
          <div className="flex justify-between  space-x-3">
            <button onClick={handleHrsDown} className="h-8 w-8 rounded-full bg-black/10">-</button>
            <button onClick={handleHrsUp} className="h-8 w-8 rounded-full bg-black/10">+</button>
          </div>
        </div>
        <h3 className="text-3xl font-bold">:</h3>
        {/* Minute panel */}
        <div className="flex flex-col items-center justify-center p-2 h-28 w-28 rounded-lg">
          <p>Minutes</p>
          {/* Input box for minutes */}
          <input
            type="text"
            value={inputMinutes}
            onChange={handleMinutesInputChange}
            className="text-3xl font-bold w-16 text-center mb-2"
          />
          {/* Buttons for minute adjustment */}
          <div className="flex justify-between  space-x-3">
            <button onClick={handleMinsDown} className="h-8 w-8 rounded-full bg-black/10">-</button>
            <button onClick={handleMinsUp} className="h-8 w-8 rounded-full bg-black/10">+</button>
          </div>
        </div>
      </div>
    </div>
  );
};

function SetTimer() {
  const sessionDuration = useSelector((state) => state.sessionDuration);
  const dispatch = useDispatch();
  const handleSessionDurationChange = (newHours, newMinutes) => {
    dispatch(
      setSessionDuration({ hours: parseInt(newHours), minutes: parseInt(newMinutes), seconds: 0 })
    );
  };

  return (
    <div className="flex flex-col justify-center bg-[#FDE2E2] p-6 rounded-xl"> 
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
};

export default SetTimer;
