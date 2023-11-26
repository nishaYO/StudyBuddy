import React from "react";

const PopUp = ({ onClose }) => {
    
  const popupStyle = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "pink",
    padding: "1rem",
    width: "700px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  };

  return (
    <div style={popupStyle}>
      <div>Hello! PopUp I am a nice pop up page.</div>
      <button
        onClick={onClose}
        style={{
          marginTop: "1rem",
          backgroundColor: "blue",
          color: "white",
          padding: "0.5rem 1rem",
          border: "none",
        }}
      >
        Close
      </button>
    </div>
  );
};

export default PopUp;
