import React, { useEffect, useState } from 'react';
import { useLocation } from 'wouter';

function Reports() {
  const [location, navigate] = useLocation();
  const [currentStreak, setCurrentStreak] = useState(0);
  const [highestStreak, setHighestStreak] = useState(0);
  const [highestHoursSession, setHighestHoursSession] = useState(0);
  const [totalHours, setTotalHours] = useState(0);
  const [todayHours, setTodayHours] = useState(0);

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
      <p className='m-5'>Current Streak: {currentStreak}</p>
      <p className='m-5'>Highest Streak: {highestStreak}</p>
      <p className='m-5'>Today's Hours: {todayHours}</p>
      <p className='m-5'>Total Hours: {totalHours}</p>
      <p className='m-5'>Highest Hours Session: {highestHoursSession}</p>
      </div>
    </div>
  );
}

export default Reports;
