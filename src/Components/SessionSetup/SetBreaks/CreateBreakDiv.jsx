import React from "react";

const CreateBreakDiv = ({top, breakDivHeight, gridWidth}) => {
  const breakDivWidth = gridWidth - (gridWidth) / 100;
  return (
    <div
      style={{
        position: "absolute",
        top: `${top}px`,
        width: `${breakDivWidth}px`,
        height: `${breakDivHeight}px`,
        backgroundColor: "orange",
        marginLeft: `${gridWidth / 200 }px`,
        cursor: "pointer",
        borderRadius: "4px",
        boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.3)",
      }}
    ></div>
  );
};

export default CreateBreakDiv;
