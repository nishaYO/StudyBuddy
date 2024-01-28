import React, { useState } from "react";

const ConfirmModal = ({ handleSessionEnded, onClose }) => {
  const handleConfirmationModalConfirm = () => {
    handleSessionEnded();
    onClose();
  };

  const handleConfirmationModalCancel = () => {
    onClose();
  };

  return (
    <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-4 rounded shadow-md text-center">
        <p>Are you sure you want to end the session?</p>
        <button
          onClick={handleConfirmationModalConfirm}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Yes
        </button>
        <button
          onClick={handleConfirmationModalCancel}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          No
        </button>
      </div>
    </div>
  );
};

export default ConfirmModal;
