import React, { useState } from "react";
import { setBreaks } from "../../../redux/breakslice";
import { useDispatch, useSelector } from "react-redux";

const PopUp = ({ onClose, index, currentBreakDuration }) => {
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

  const [localCurrentBreakDuration, setLocalCurrentBreakDuration] =
    useState(currentBreakDuration);

  const dispatch = useDispatch();
  const breaks = useSelector((state) => state.breaks);

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

  const handleSaveClick = () => {
    // Close the popup
    onClose();


    handleHoursInputChange({
      target: { value: localCurrentBreakDuration.hours },
    });
    handleMinutesInputChange({
      target: { value: localCurrentBreakDuration.minutes },
    });

    updateBreakDuration(
      localCurrentBreakDuration.hours,
      localCurrentBreakDuration.minutes
    );
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
    </div>
  );
};

export default PopUp;
