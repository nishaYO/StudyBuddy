import { Link, useLocation } from "wouter";
import SetTimer from "./SessionSetupComponents/SetTimer";
import SetBreaks from "./SessionSetupComponents/SetBreaks";
import SetMusic from "./SessionSetupComponents/SetMusic";
import SidePanel from "./SidePanel";
import Navbar from "./Navbar";
import { useState } from "react";
import { setSessionIntervals } from "./../redux/sessionIntervals";
import { useDispatch, useSelector } from "react-redux";

function SessionSetup() {
  const dispatch = useDispatch();
  const sessionIntervals = useSelector((state) => state.sessionIntervals);
  const sessionDuration = useSelector((state) => state.sessionDuration);
  console.log("Session intervals:", sessionIntervals);
  console.log("Session Duration:", sessionDuration);
  const breaks = useSelector((state) => state.breaks);
  const [currentStep, setCurrentStep] = useState(0);
  const [location, navigate] = useLocation();

  // components for each step
  const steps = [<SetTimer />, <SetBreaks />, <SetMusic />];
  const addLastSessionInterval = () => {
    // total duration of all existing intervals
    const totalIntervalDuration = sessionIntervals.reduce(
      (acc, interval) => {
        return {
          hours: acc.hours + parseInt(interval[0].hours),
          minutes: acc.minutes + parseInt(interval[0].minutes),
          seconds: acc.seconds + parseInt(interval[0].seconds),
        };
      },
      { hours: 0, minutes: 0, seconds: 0 }
    );

    // last interval duration = total Session Duration - total intervals duration
    const lastIntervalDuration = {
      hours: String(sessionDuration.hours - totalIntervalDuration.hours),
      minutes: String(sessionDuration.minutes - totalIntervalDuration.minutes),
      seconds: String(sessionDuration.seconds - totalIntervalDuration.seconds),
    };
  
    const lastInterval = {
      ...lastIntervalDuration,
      type: "study",
    };
  
    dispatch(setSessionIntervals([...sessionIntervals, lastInterval]));
  };

  const handleNextClick = () => {
    // Increment step index
    setCurrentStep((prevStep) => Math.min(prevStep + 1, steps.length - 1));
    if (currentStep === steps.length - 1) {
      navigate("/session");
      const sessionStartedTimeStamp = new Date();
    }

    // when all breaks set, add the last session interval
    if (currentStep === 1) {
      addLastSessionInterval();
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
