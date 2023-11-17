import React, { useEffect, useState } from 'react';
import { useLocation } from 'wouter';

function Reports() {
  const [location, navigate] = useLocation();

  // sample reports object
  // to be replaced by the object received from the backend when user navigates to this page.
  const reports = {
    "current Streak": 0,
    "Highest Streak": 0,
    "Highest Hours Session": 0,
    "total Hours": 0,
    "today total Hours": 0
  }
  

  const handlePreviousClick = () => {
    // todo: Navigate back to the previous page
    navigate("/");
  };

  return (
    <div className='m-5 flex flex-col items-center'>
      <button
        className="bg-[#D0BFFF] text-white px-4 py-2 m-2 rounded"
        onClick={handlePreviousClick}
      >
        Back
      </button>
        <h2 className=''>See your Reports📝</h2>
        <div className="bg-white flex flex-col items-center w-full lg:w-1/2 p-5 m-4 border-2 rounded-lg border-[#BEADFA] shadow-lg">
        {Object.keys(reports).map((key) => (
          <p key={key} className='m-5'>{key.charAt(0).toUpperCase() + key.slice(1)}: {reports[key]}</p>
        ))}
      </div>
    </div>
  );
}

export default Reports;