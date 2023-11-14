// components/SetTimer.jsx
import React, { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons';

function SetTimer({ totalDurationProp }) {
  const [hours, setHours] = useState(parseInt(sessionStorage.getItem('hours')) || 2);
  const [minutes, setMinutes] = useState(parseInt(sessionStorage.getItem('minutes')) || 30);
  const [location, navigate] = useLocation();

  const [endTime, setEndTime] = useState('');

  const formatTime = (date) => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };
  
  useEffect(() => {
    const currentTime = new Date();
    currentTime.setHours(currentTime.getHours() + hours);
    currentTime.setMinutes(currentTime.getMinutes() + minutes);
    setEndTime(formatTime(currentTime));
    sessionStorage.setItem('hours', hours);
    sessionStorage.setItem('minutes', minutes);
    totalDurationProp=(`${hours}:${minutes}`);
  }, [hours, minutes]);

  return (
    <div className="flex flex-col justify-center">
    {/* <div> */}
      <p className="text-3xl font-bold mb-4">Set The Session Duration</p>
      <TimeDialer hours={hours} setHours={setHours} minutes={minutes} setMinutes={setMinutes} />
      <div className="text-lg mt-4 bg-[#D0BFFF]">
        The session will end at {endTime}
      </div>
    </div>
  );
}

const TimeDialer = ({ hours, setHours, minutes, setMinutes }) => {
  const handleHrsUp = () => {
    setHours(hours < 23 ? hours + 1 : 0);
  };

  const handleHrsDown = () => {
    setHours(hours > 0 ? hours - 1 : 23);
  };

  const handleMinsUp = () => {
    setMinutes(minutes < 59 ? minutes + 1 : 0);
  };

  const handleMinsDown = () => {
    setMinutes(minutes > 0 ? minutes - 1 : 59);
  };

  return (
    <div className="flex space-x-4 bg-[#D0BFFF] p-5">
      <div className="flex flex-col items-center">
        <p className="text-lg">hrs</p>
        <button className="text-2xl" onClick={handleHrsUp}><FontAwesomeIcon icon={faAngleUp} /></button>
        <input className="text-lg w-10 border border-gray-400 rounded p-1" type="number" value={hours.toString().padStart(2, '0')} onChange={(e) => setHours(parseInt(e.target.value))} />
        <button className="text-2xl" onClick={handleHrsDown}><FontAwesomeIcon icon={faAngleDown} /></button>
      </div>
      <div className="flex flex-col items-center">
        <p className="text-lg">mins</p>
        <button className="text-2xl" onClick={handleMinsUp}><FontAwesomeIcon icon={faAngleUp} /></button>
        <input className="text-lg w-10 border border-gray-400 rounded p-1" type="number" value={minutes.toString().padStart(2, '0')} onChange={(e) => setMinutes(parseInt(e.target.value))} />
        <button className="text-2xl" onClick={handleMinsDown}><FontAwesomeIcon icon={faAngleDown} /></button>
      </div>
    </div>
  );
};

export default SetTimer;
