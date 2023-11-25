import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp, faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { setSessionDuration } from "../../redux/sessionDuration";
import { useDispatch, useSelector } from "react-redux";

function SetTimer() {
  const sessionDuration = useSelector((state) => state.sessionDuration);
  const dispatch = useDispatch();
  const [hours, setHours] = useState(sessionDuration.hours);
  const [minutes, setMinutes] = useState(sessionDuration.minutes);

  // Update Redux state when input values change
  const handleSessionDurationChange = () => {
    dispatch(setSessionDuration({ hours, minutes }));
  };

  return (
    <div className="flex flex-col justify-center">
      <p className="text-3xl font-bold mb-4">Set The Session Duration</p>
      <TimeDialer
        hours={hours}
        setHours={setHours}
        minutes={minutes}
        setMinutes={setMinutes}
        onSessionDurationChange={handleSessionDurationChange}
      />
      <div className="text-lg mt-4 bg-[#D0BFFF]">
        The session will end after {`${hours} hours ${minutes} mins.`}
      </div>
    </div>
  );
}

const TimeDialer = ({
  hours,
  setHours,
  minutes,
  setMinutes,
  onSessionDurationChange,
}) => {
  const handleHrsUp = () => {
    setHours(hours < 23 ? hours + 1 : 0);
    onSessionDurationChange();
  };

  const handleHrsDown = () => {
    setHours(hours > 0 ? hours - 1 : 23);
    onSessionDurationChange();
  };

  const handleMinsUp = () => {
    setMinutes(minutes < 59 ? minutes + 1 : 0);
    onSessionDurationChange();
  };

  const handleMinsDown = () => {
    setMinutes(minutes > 0 ? minutes - 1 : 59);
    onSessionDurationChange();
  };

  return (
    <div className="flex space-x-4 bg-[#D0BFFF] p-5">
      <div className="flex flex-col items-center">
        <p className="text-lg">hrs</p>
        <button className="text-2xl" onClick={handleHrsUp}>
          <FontAwesomeIcon icon={faAngleUp} />
        </button>
        <input
          className="text-lg w-10 border border-gray-400 rounded p-1"
          type="number"
          value={hours.toString().padStart(2, "0")}
          onChange={(e) => setHours(parseInt(e.target.value))}
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
          onChange={(e) => setMinutes(parseInt(e.target.value))}
        />
        <button className="text-2xl" onClick={handleMinsDown}>
          <FontAwesomeIcon icon={faAngleDown} />
        </button>
      </div>
    </div>
  );
};

export default SetTimer;
