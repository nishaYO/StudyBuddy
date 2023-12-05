import React, { useState } from "react";
import { setBreaks } from "../../../redux/breakslice";
import { useDispatch, useSelector } from "react-redux";
import ConvertPixelToTime from "./ConvertPixelToTime";
import ConvertTimeToMinutes from "./../../../utils/ConvertTimeToMinutes";

const PopUp = ({ onClose, index, currentBreakDuration, breakStartTime }) => {
  const popupStyle = {
    position: "fixed",
    top: "50%",
    left: "84%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "yellow",
    padding: "1rem",
    width: "400px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  };

  let [localCurrentBreakDuration, setLocalCurrentBreakDuration] =
    useState(currentBreakDuration);

  const dispatch = useDispatch();
  const breaks = useSelector((state) => state.breaks);
  const sessionDuration = useSelector((state) => state.sessionDuration);

  const updateBreakDuration = (newHours, newMinutes) => {
    // Update the breaks array
    const updatedBreaks = breaks.map((breakItem, i) => {
      if (i === index) {
        return {
          ...breakItem,
          breakDuration: {
            hours: newHours,
            minutes: newMinutes,
          },
        };
      }
      return breakItem;
    });

    dispatch(setBreaks(updatedBreaks));
    // console.log("Updated breaks array:", updatedBreaks);
  };

  const handleHoursInputChange = (event) => {
    const { value } = event.target;
    setLocalCurrentBreakDuration((prevDuration) => ({
      ...prevDuration,
      hours: value,
    }));
  };

  const handleMinutesInputChange = (event) => {
    const { value } = event.target;
    setLocalCurrentBreakDuration((prevDuration) => ({
      ...prevDuration,
      minutes: value,
    }));
  };

  const handleDeleteBreak = () => {
    onClose();
    const updatedBreaks = breaks.filter((_, i) => i !== index);
    dispatch(setBreaks(updatedBreaks));
  };

  const handleSaveClick = () => {
    // make exceeding values in popup reduce to max sessionduration length
    const parsedBreakDuration = ConvertTimeToMinutes({
      timeObject: localCurrentBreakDuration,
    });
    const parsedSessionDuration =
    ConvertTimeToMinutes({ timeObject: sessionDuration
    })
    const parsedBreakStartTime = parseInt(breakStartTime);
    if (parsedBreakDuration + parsedBreakStartTime > parsedSessionDuration) {
      const newBreakDuration = parsedSessionDuration - parsedBreakStartTime;
      localCurrentBreakDuration = ConvertPixelToTime({totalMinutes: newBreakDuration});
      console.log("breakDuration: ", newBreakDuration)
      console.log("localCurrentBreakDuration: ", localCurrentBreakDuration)
    }

    // Treat empty input values as '00'
    const hours = localCurrentBreakDuration.hours || "00";
    const minutes = localCurrentBreakDuration.minutes || "00";
    if (parseInt(hours) + parseInt(minutes) == 0) {
      handleDeleteBreak();
      return;
    }
    // Close the popup
    onClose();

    handleHoursInputChange({
      target: { value: hours },
    });
    handleMinutesInputChange({
      target: { value: minutes },
    });

    updateBreakDuration(hours, minutes);
  };

  return (
    <div style={popupStyle}>
      <div>
        <div>
          Set Break Duration
          <input
            className="border rounded p-2 text-sm m-2"
            type="text"
            id="breakDuration.hours"
            value={localCurrentBreakDuration.hours}
            onChange={(e) => handleHoursInputChange(e)}
          />
          hrs
          <input
            className="border rounded p-2 text-sm m-2"
            type="text"
            id="breakDuration.minutes"
            value={localCurrentBreakDuration.minutes}
            onChange={(e) => handleMinutesInputChange(e)}
          />
          mins
        </div>
      </div>
      <button
        onClick={handleSaveClick}
        className="mt-4 ml-2 rounded-md bg-blue-500 text-white px-4 py-2 border-none"
      >
        Save
      </button>
      <button
        onClick={handleDeleteBreak}
        className="mt-4 ml-2 rounded-md bg-blue-500 text-white px-4 py-2 border-none"
      >
        Delete
      </button>
    </div>
  );
};

export default PopUp;
