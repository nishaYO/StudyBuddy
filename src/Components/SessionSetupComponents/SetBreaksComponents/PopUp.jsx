import React, { useState } from "react";
import { setBreaks } from "../../../redux/breakslice";
import { useDispatch, useSelector } from "react-redux";
import ConvertPixelToTime from "./ConvertPixelToTime";
import ConvertTimeToMinutes from "../../Services/ConvertTimeToMinutes";

const PopUp = ({ onClose, index, currentBreakDuration, breakStartTime }) => {
  
  const parsedBreakStartTime = parseInt(breakStartTime) || 0;
  const currentBreakStartTime = ConvertPixelToTime({
    totalMinutes: parsedBreakStartTime,
  });

  let [localCurrentBreakDuration, setLocalCurrentBreakDuration] =
    useState(currentBreakDuration);

  let [localCurrentBreakStartTime, setLocalCurrentBreakStartTime] = useState(
    currentBreakStartTime
  );

  const dispatch = useDispatch();
  const breaks = useSelector((state) => state.breaks);
  const sessionDuration = useSelector((state) => state.sessionDuration);

  const updateBreaks = (newDuration, newStartTime) => {
    // Update the breaks array
    const updatedBreaks = breaks.map((breakItem, i) => {
      if (i === index) {
        return {
          ...breakItem,
          breakDuration: {
            hours: parseInt(newDuration.hours, 10),
            minutes: parseInt(newDuration.minutes, 10),
            seconds: 0,
          },
          breakStartTime: {
            hours: parseInt(newStartTime.hours, 10),
            minutes: parseInt(newStartTime.minutes, 10),
            seconds: 0,
          },
        };
      }
      return breakItem;
    });

    dispatch(setBreaks(updatedBreaks));
  };
  const handleDurationHoursInputChange = (event) => {
    const { value } = event.target;
    setLocalCurrentBreakDuration((prevDuration) => ({
      ...prevDuration,
      hours: value,
    }));
  };

  const handleDurationMinutesInputChange = (event) => {
    const { value } = event.target;
    setLocalCurrentBreakDuration((prevDuration) => ({
      ...prevDuration,
      minutes: value,
    }));
  };
  const handleStartTimeHoursInputChange = (event) => {
    const { value } = event.target;
    setLocalCurrentBreakStartTime((prevStartTime) => ({
      ...prevStartTime,
      hours: value,
    }));
  };

  const handleStartTimeMinutesInputChange = (event) => {
    const { value } = event.target;
    setLocalCurrentBreakStartTime((prevStartTime) => ({
      ...prevStartTime,
      minutes: value,
    }));
  };

  const handleDeleteBreak = () => {
    onClose();
    const updatedBreaks = breaks.filter((_, i) => i !== index);
    dispatch(setBreaks(updatedBreaks));
  };

  const handleSaveClick = () => {
    // make exceeding values in popup reduce to max session duration length
    const parsedBreakDuration = ConvertTimeToMinutes({
      timeObject: localCurrentBreakDuration,
    });
    const parsedSessionDuration = ConvertTimeToMinutes({
      timeObject: sessionDuration,
    });
    const parsedBreakStartTime = parseInt(breakStartTime);
    if (parsedBreakDuration + parsedBreakStartTime > parsedSessionDuration) {
      const newBreakDuration = parsedSessionDuration - parsedBreakStartTime;
      localCurrentBreakDuration = ConvertPixelToTime({
        totalMinutes: newBreakDuration,
      });
      console.log("breakDuration: ", newBreakDuration);
      console.log("localCurrentBreakDuration: ", localCurrentBreakDuration);
    }

    // Treat empty input values as '00'
    const durationHours = localCurrentBreakDuration.hours || 0;
    const durationMinutes = localCurrentBreakDuration.minutes || 0;
    if (parseInt(durationHours) + parseInt(durationMinutes) == 0) {
      handleDeleteBreak();
      return;
    }
    // Close the popup
    onClose();

    handleDurationHoursInputChange({
      target: { value: durationHours },
    });
    handleDurationMinutesInputChange({
      target: { value: durationMinutes },
    });

    // startTime update
    const startHours = parseInt(localCurrentBreakStartTime.hours) || 0;
    const startMinutes = parseInt(localCurrentBreakStartTime.minutes) || 0;

    handleStartTimeHoursInputChange({
      target: { value: startHours },
    });
    handleStartTimeMinutesInputChange({
      target: { value: startMinutes },
    });

    // update the breaks array state
    updateBreaks(
      {
        hours: durationHours,
        minutes: durationMinutes,
      },
      {
        hours: startHours,
        minutes: startMinutes,
      }
    );
  };
  const popupStyle = {
    position: "fixed",
    top: "50%",
    left: "86%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#efcaf1",
    padding: "1rem",
    width: "410px",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  };
  
  return (
    <div style={popupStyle}>
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Set the break duration</h3>
        <div className="flex items-center">
          <input
            className="border rounded p-2 text-sm mr-2 w-10"
            type="text"
            id="breakDuration.hours"
            value={localCurrentBreakDuration.hours}
            onChange={(e) => handleDurationHoursInputChange(e)}
          />
          <span className="text-sm mr-2">hrs</span>
          <input
            className="border rounded p-2 text-sm mr-2 w-10"
            type="text"
            id="breakDuration.minutes"
            value={localCurrentBreakDuration.minutes}
            onChange={(e) => handleDurationMinutesInputChange(e)}
          />
          <span className="text-sm">mins</span>
        </div>
      </div>
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Set start time for the break</h3>
        <div className="flex items-center">
          <input
            className="border rounded p-2 text-sm mr-2 w-10"
            type="text"
            id="startTime.hours"
            value={localCurrentBreakStartTime.hours}
            onChange={(e) => handleStartTimeHoursInputChange(e)}
          />
          <span className="text-sm mr-2">hrs</span>
          <input
            className="border rounded p-2 text-sm mr-2 w-10"
            type="text"
            id="startTime.minutes"
            value={localCurrentBreakStartTime.minutes}
            onChange={(e) => handleStartTimeMinutesInputChange(e)}
          />
          <span className="text-sm">mins</span>
        </div>
      </div>
      <button
        onClick={handleSaveClick}
        className="mt-4 rounded-md bg-blue-500 text-white px-4 py-2 border-none hover:bg-blue-600"
      >
        Save
      </button>
      <button
        onClick={handleDeleteBreak}
        className="mt-4 ml-2 rounded-md bg-red-500 text-white px-4 py-2 border-none hover:bg-red-600"
      >
        Delete
      </button>
    </div>
  );
  
};

export default PopUp;
