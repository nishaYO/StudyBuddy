import React from "react";

const CreateBreakDiv = ({top}) => {
  return (
    <div
      style={{
        position: "absolute",
        top: `${top}px`,
        width: "460px",
        height: "15px",
        backgroundColor: "orange",
        marginLeft: "40px",
        cursor: "pointer",
        borderRadius: "4px",
        boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.3)",
      }}
    ></div>
  );
};

export default CreateBreakDiv;
