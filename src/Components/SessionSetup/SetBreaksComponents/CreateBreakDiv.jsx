import React, { useState } from "react";
import PopUp from "./PopUp";

const CreateBreakDiv = ({
  top,
  breakDivHeight,
  gridWidth,
  onClick,
  popUpClose,
}) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
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

  return (
    <div>
      <div
        style={{
          position: "absolute",
          top: top,
          width: `${breakDivWidth}px`,
          height: breakDivHeight,
          backgroundColor: "orange",
          marginLeft: `${gridWidth / 200}px`,
          cursor: "pointer",
          borderRadius: "4px",
          boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.3)",
        }}
        onMouseDown={handleBreakDivClick}
      ></div>
      {isPopupOpen && <PopUp onClose={handlePopupClose} />}
    </div>
  );
};

export default CreateBreakDiv;
