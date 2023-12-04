import React, { useState } from "react";

const PopUp = ({ onClose, index, updateBreak, currentBreakDuration }) => {
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

  const [localCurrentBreakDuration, setLocalCurrentBreakDuration] = useState(
    currentBreakDuration
  );

  const handleHoursInputChange = (event) => {
    const { value } = event.target;
    setLocalCurrentBreakDuration((prevDuration) => ({
      ...prevDuration,
      hours: value,
    }));
    console.log(localCurrentBreakDuration)
  };
  
  const handleMinutesInputChange = (event) => {
    const { value } = event.target;
    setLocalCurrentBreakDuration((prevDuration) => ({
      ...prevDuration,
      minutes: value,
    }));
    console.log(localCurrentBreakDuration)
  };
  
  const handleSaveClick = () => {
    // Close the popup
    onClose();
    // Call handleHoursInputChange and handleMinutesInputChange with respective values
    handleHoursInputChange({
      target: { value: localCurrentBreakDuration.hours },
    });
    handleMinutesInputChange({
      target: { value: localCurrentBreakDuration.minutes },
    });
    console.log("in save handler" , localCurrentBreakDuration)
  
    // Execute the updateBreak function with the latest values
    updateBreak("breakDuration", "hours", localCurrentBreakDuration.hours);
    updateBreak("breakDuration", "minutes", localCurrentBreakDuration.minutes);
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
