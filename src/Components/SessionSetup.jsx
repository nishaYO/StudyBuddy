import { Link, useLocation } from "wouter";
import SetTimer from "./SessionSetupComponents/SetTimer";
import SetBreaks from "./SessionSetupComponents/SetBreaks";
import SetMusic from "./SessionSetupComponents/SetMusic";
import SidePanel from "./SidePanel";
import Navbar from "./Navbar";
import { useState } from "react";

function SessionSetup() {
  const [currentStep, setCurrentStep] = useState(0);
  const [location, navigate] = useLocation();

  // components for each step
  const steps = [<SetTimer />, <SetBreaks />, <SetMusic />];

  const handleNextClick = () => {
    // Increment step index
    setCurrentStep((prevStep) => Math.min(prevStep + 1, steps.length - 1));
    if (currentStep === steps.length - 1) {
      navigate("/session");
      const sessionStartedTimeStamp = new Date();
    }
  };

  const handlePreviousClick = () => {
    // Decrement step index
    setCurrentStep((prevStep) => Math.max(prevStep - 1, 0));
    if (currentStep === 0) {
      navigate("/");
    }
  };

  return (
    <div className="flex-1 font-mono bg-[#FFF3DA] p-0 min-h-screen">
      <Navbar />
      <div className="flex">
        <SidePanel />
        <div className="flex flex-col items-center justify-center h-screen">
          {/* Main Box in the Center */}
          <div className="bg-red-200 p-3 rounded-lg mb-8 w-4/5 h-6/7">
            {steps[currentStep]}
          </div>

          {/* Navigation Buttons */}
          <div className="flex space-x-4">
            <button
              className="bg-purple-500 text-white px-4 py-2 rounded"
              onClick={handlePreviousClick}
            >
              Previous
            </button>
            <button
              className="bg-purple-500 text-white px-4 py-2 rounded"
              onClick={handleNextClick}
            >
              Next
            </button>
          </div>

          {/* Reports Button */}
          <div className="absolute bottom-0 right-0 m-7 p-0">
            <Link href="/reports">
              <button className="bg-purple-500 text-white px-4 py-2 rounded">
                Reports
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SessionSetup;
