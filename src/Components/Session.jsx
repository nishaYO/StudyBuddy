import React from "react";
import { Link } from "wouter";
import Welcome from "./SessionSetup/Welcome";
import SetTimer from "./SessionSetup/SetTimer";
import SetBreaks from "./SessionSetup/SetBreaks";
import SetMusic from "./SessionSetup/SetMusic";


function SessionStarted() {

  // components for each step
  const steps = [
    <Welcome/>,
    <SetTimer />,
    <SetBreaks />,
    <SetMusic />,
  ];



  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {/* Main Box in the Center */}
      <div className="bg-gray-200 p-8 rounded-lg mb-8 h-60">
        <p>Hello, I am a nice SessionStarted component!</p>
      </div>

      {/* Navigation Buttons */}
      <div className="flex space-x-4">
        <Link href="/session-setup">
          <button className="bg-purple-500 text-white px-4 py-2 rounded">Previous</button>
        </Link>
        <Link href="/session-started">
          <button className="bg-purple-500 text-white px-4 py-2 rounded">Next</button>
        </Link>
      </div>

      {/* Reports Button */}
      <div className="absolute bottom-0 right-0 m-7 p-0">
          <Link href="/reports">
            <button className="bg-purple-500 text-white px-4 py-2 rounded">Reports</button>
          </Link>
        </div>
    </div>
  );
}

export default SessionStarted;
