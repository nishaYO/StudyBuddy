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
      <p>Hello, I am a nice SessionStarted component!</p>
    </div>
  );
}

export default SessionStarted;
