import React from "react";

const PopUp = ({ onClose }) => {
  const popupStyle = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "yellow",
    padding: "1rem",
    width: "700px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  };
  const handleInputChange = (e, key) => {};
  return (
    <div style={popupStyle}>
      <div>
        <div>
          <input className="border rounded p-2 text-sm m-2" type="number" />
          <input className="border rounded p-2 text-sm m-2" type="number" />
        </div>
        <div>
          <input className="border rounded p-2 text-sm m-2" type="number" />
          <input className="border rounded p-2 text-sm m-2" type="number" />
        </div>
      </div>
      <button
        onClick={onClose}
        style={{
          marginTop: "1rem",
          marginLeft: "10px",
          borderRadius: "3px",
          backgroundColor: "blue",
          color: "white",
          padding: "0.5rem 1rem",
          border: "none",
        }}
      >
        Save
      </button>
      <button
        // onClick={onClose}
        style={{
          marginTop: "1rem",
          marginLeft: "10px",
          borderRadius: "3px",
          backgroundColor: "blue",
          color: "white",
          padding: "0.5rem 1rem",
          border: "none",
        }}
      >
        Delete
      </button>
      <button
        // onClick={onClose}
        style={{
          marginTop: "1rem",
          marginLeft: "10px",
          borderRadius: "3px",
          backgroundColor: "blue",
          color: "white",
          padding: "0.5rem 1rem",
          border: "none",
        }}
      >
        CROSS
      </button>
    </div>
  );
};

export default PopUp;
