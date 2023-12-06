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
    width: "440px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  };
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
            hours: newDuration.hours,
            minutes: newDuration.minutes,
            seconds: '0',
          },
          breakStartTime: {
            hours: newStartTime.hours,
            minutes: newStartTime.minutes,
            seconds: '0',
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
    // make exceeding values in popup reduce to max sessionduration length
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
    const durationHours = localCurrentBreakDuration.hours || "00";
    const durationMinutes = localCurrentBreakDuration.minutes || "00";
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

  return (
    <div style={popupStyle}>
      <div>
        <div>
          <div>
            <h3>set breakDuration </h3>
            <input
              className="border rounded p-2 text-sm m-2"
              type="text"
              id="breakDuration.hours"
              value={localCurrentBreakDuration.hours}
              onChange={(e) => handleDurationHoursInputChange(e)}
            />
            hrs
            <input
              className="border rounded p-2 text-sm m-2"
              type="text"
              id="breakDuration.minutes"
              value={localCurrentBreakDuration.minutes}
              onChange={(e) => handleDurationMinutesInputChange(e)}
            />
            mins
          </div>
          <div>
            <h3>set breakStartTime</h3>
            <input
              className="border rounded p-2 text-sm m-2"
              type="text"
              id="startTime.hours"
              value={localCurrentBreakStartTime.hours}
              onChange={(e) => handleStartTimeHoursInputChange(e)}
            />
            hrs
            <input
              className="border rounded p-2 text-sm m-2"
              type="text"
              id="startTime.minutes"
              value={localCurrentBreakStartTime.minutes}
              onChange={(e) => handleStartTimeMinutesInputChange(e)}
            />
            mins
          </div>
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
