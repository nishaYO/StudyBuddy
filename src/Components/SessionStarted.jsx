import React from 'react';
import { useLocation } from 'wouter';

function SessionStarted() {
  const [location, navigate] = useLocation();

  const handlePreviousClick = () => {
    // todo: Navigate back to the previous page
    navigate("/");
  };

  return (
    <div className='m-5'>
      <button
        className="bg-[#D0BFFF] text-white px-4 py-2 m-2 rounded"
        onClick={handlePreviousClick}
      >
        Previous
      </button>
      <p>show a nice calendar type thing for entire session</p>
      <p>After session completed, show start another session button. Good job text! See Reports button. Update total hours today and total hours yet, and update streak</p>
    </div>
  );
}

export default SessionStarted;
