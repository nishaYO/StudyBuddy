import React, { useState } from "react";
import ConvertPixelToTime from "./ConvertPixelToTime";
import PopUp from "./PopUp";

const CreateBreakDiv = ({
  index,
  top,
  breakDivHeight,
  gridWidth,
  onClick,
  popUpClose,
}) => {
  const [isPopupOpen, setIsPopupOpen] = useState(true);

  const handlePopupClose = () => {
    setIsPopupOpen(false);
    popUpClose();
  };

  const breakDivWidth = gridWidth - gridWidth / 100;

  const handleBreakDivClick = (event) => {
    event.stopPropagation();
    setIsPopupOpen(true);
    onClick();
  };

  const breakHeightNumeric = parseInt(breakDivHeight, 10);
  const currentBreakDuration = ConvertPixelToTime({
    totalMinutes: breakHeightNumeric,
  });

  // console.log("Break Div Height:", breakDivHeight);
  // console.log("Current Break Duration:", currentBreakDuration);
  return (
    <div>
      <div
        style={{
          position: "absolute",
          top: top,
          width: `${breakDivWidth}px`,
          height: breakDivHeight,
          backgroundColor: "#875692",
          marginLeft: `${gridWidth / 200}px`,
          cursor: "pointer",
          borderRadius: "4px",
          boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.3)",
        }}
        onMouseDown={handleBreakDivClick}
      ></div>
      {isPopupOpen && (
        <PopUp
        onClose={handlePopupClose}
        index={index}
        currentBreakDuration={currentBreakDuration}
        breakStartTime={top}
        />
      )}
    </div>
  );
};

export default CreateBreakDiv;
