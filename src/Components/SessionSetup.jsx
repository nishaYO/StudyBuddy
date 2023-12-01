import { Link, useLocation } from "wouter";
import SetTimer from "./SessionSetupComponents/SetTimer";
import SetBreaks from "./SessionSetupComponents/SetBreaks";
import SetMusic from "./SessionSetupComponents/SetMusic";
import SidePanel from "./SidePanel";
import Navbar from "./Navbar";
import { useState } from "react";
import { setSessionIntervals } from "./../redux/sessionIntervals";
import { useDispatch, useSelector } from "react-redux";

  // todo: if input values are 0, 0 in the hours and minutes input elements in settimer component which is the first one to render, there should be a notification to the user that the sessionduration can't be zero
// the sessionDuration is a redux state acutally with something like this as strucuture: {hours: '1', minutes: '6', seconds: '0'}
function SessionSetup() {

  const [currentStep, setCurrentStep] = useState(0);
  const [sessionIntervalCompleted, setSessionIntervalCompleted] = useState(false);
  const [location, navigate] = useLocation();

  // sample sessionInterval
  // [
  // {hours: '1', minutes: '6', seconds: '0', type: 'study'}
  // {hours: '0', minutes: '1', seconds: '0', type: 'break'}
  // {hours: '0', minutes: '32', seconds: '0', type: 'study'}
  // {hours: '0', minutes: '1', seconds: '0', type: 'break'}
  // ]

  const addLastSessionInterval = async () => {

    // total duration of all existing intervals
    const totalIntervalDuration = sessionIntervals.reduce(
      (acc, interval) => {
        return {
          hours: acc.hours + parseInt(interval.hours),
          minutes: acc.minutes + parseInt(interval.minutes),
          seconds: acc.seconds + parseInt(interval.seconds),
        };
      },
      { hours: 0, minutes: 0, seconds: 0 }
    );
    console.log("totalIntervalDuration", totalIntervalDuration);
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

    await dispatch(setSessionIntervals([...sessionIntervals, lastInterval]));
  };


  const dispatch = useDispatch();
  const sessionIntervals = useSelector((state) => state.sessionIntervals);
  const sessionDuration = useSelector((state) => state.sessionDuration);
  const breaks = useSelector((state) => state.breaks);
  console.log("Session intervals:", sessionIntervals);
  console.log("Session Duration:", sessionDuration);
  // components for each step
  const steps = [<SetTimer />, <SetBreaks />, <SetMusic />];
  const handleNextClick = async () => {
    if (currentStep === 0) {
      // Check if both hours and minutes are zero in SetTimer component
      const { hours, minutes } = sessionDuration;
      if (parseInt(hours, 10) === 0 && parseInt(minutes, 10) === 0) {
        alert("Session duration cannot be zero!");
        return;
      } else {
        setCurrentStep((prevStep) => Math.min(prevStep + 1, steps.length - 1));
      }
    } else {
      setCurrentStep((prevStep) => Math.min(prevStep + 1, steps.length - 1));
  
      if (currentStep === steps.length - 1) {
        // Increment step index
        if (sessionIntervalCompleted) {
          navigate("/session");
          setSessionIntervalCompleted(false);
        }
      }
  
      if (currentStep === 1) {
        if (sessionIntervals.length !== breaks.length * 2 + 1) {
          await addLastSessionInterval();
          setSessionIntervalCompleted(true);
        }
      }
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

          
        </div>
      </div>
    </div>
  );
}

export default SessionSetup;
