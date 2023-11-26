import React from "react";

const CreateBreakDiv = ({ top, breakDivHeight, gridWidth, onClick }) => {
  const breakDivWidth = gridWidth - gridWidth / 100;
  const handleBreakDivClick = (event) => {
    event.stopPropagation();
    onClick();
  };

  return (
    <div
      style={{
        position: "absolute",
        top: `${top}px`,
        width: `${breakDivWidth}px`,
        height: `${breakDivHeight}px`,
        backgroundColor: "orange",
        marginLeft: `${gridWidth / 200}px`,
        cursor: "pointer",
        borderRadius: "4px",
        boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.3)",
      }}
      onMouseDown={handleBreakDivClick}
    ></div>
  );
};

export default CreateBreakDiv;
