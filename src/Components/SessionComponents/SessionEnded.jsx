import React from "react";
import { useLocation } from "wouter";

function SessionEnded() {
  const totalStudyDuration = 2;
  const [location, navigate] = useLocation();
  
  return (
    <div className="flex flex-col h-screen bg-red-100 w-[1600px]">
      <div className="flex items-center justify-center h-screen">
        <div className="bg-white p-8 rounded shadow-md text-center mx-auto">
          <h2 className="text-3xl font-semibold mb-4">Session Ended</h2>
          <div className="flex justify-center mb-4">
            {/* <button className="bg-blue-500 text-white px-4 py-2 rounded mr-2">
              Resume The session
            </button> */}
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
              onClick={() => navigate("/session-setup")}
            >
              Make a new session
            </button>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded"
              onClick={() => navigate("/help")}
            >
              Share feedback
            </button>
          </div>
          <div className="mt-4">
            <p className="text-gray-700">
              Total Study Time in the session: {totalStudyDuration} hours
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SessionEnded;
