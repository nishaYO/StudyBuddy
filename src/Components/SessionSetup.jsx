import { Link, useLocation } from "wouter";
import SetTimer from "./SessionSetupComponents/SetTimer";
import SetBreaks from "./SessionSetupComponents/SetBreaks";
import SetMusic from "./SessionSetupComponents/SetMusic";
import SidePanel from "./SidePanel";
import Navbar from "./Navbar";
import { useState } from "react";
import { setSessionIntervals } from "./../redux/sessionIntervals";
import { setBreaks } from "./../redux/breakslice";
import { useDispatch, useSelector } from "react-redux";
import ConvertTimeToPixel from "./SessionSetupComponents/SetBreaksComponents/ConvertTimeToPixel";
import ConvertTimeToMinutes from "./../utils/ConvertTimeToMinutes";

// todo: create local states for redux states and update them whenver they are changed and dispatched.
function SessionSetup() {
  const [location, navigate] = useLocation();

  const [currentStep, setCurrentStep] = useState(0);
  const [sessionIntervalCompleted, setSessionIntervalCompleted] =
    useState(false);

  function formatTime(input) {
    let { hours, minutes, seconds } = input;
    // Convert excess minutes to hours
    hours += Math.floor(minutes / 60);
    minutes = minutes % 60;
    seconds = seconds % 60;
    return { hours, minutes, seconds };
  }

  const addLastSessionInterval = async (newSessionIntervals) => {
    // total duration of all existing intervals
    const totalIntervalDuration = newSessionIntervals.reduce(
      (acc, interval) => {
        return {
          hours: acc.hours + parseInt(interval.hours),
          minutes: acc.minutes + parseInt(interval.minutes),
          seconds: acc.seconds + parseInt(interval.seconds),
        };
      },
      { hours: 0, minutes: 0, seconds: 0 }
    );

    // last interval duration = total Session Duration - total intervals duration
    const lastIntervalDuration = {
      hours: String(sessionDuration.hours - totalIntervalDuration.hours),
      minutes: String(sessionDuration.minutes - totalIntervalDuration.minutes),
      seconds: String(sessionDuration.seconds - totalIntervalDuration.seconds),
      type: "study",
    };
    return lastIntervalDuration;
  };

  const sortBreaks = async () => {
    try {
      const sortedBreaks = [...breaks];
      sortedBreaks.sort((a, b) => {
        const timeA = ConvertTimeToMinutes({ timeObject: a.breakStartTime });
        const timeB = ConvertTimeToMinutes({ timeObject: b.breakStartTime });
        return timeA - timeB;
      });
      console.log("sortedBreaks:", sortedBreaks);
      dispatch(setBreaks(sortedBreaks));
      return sortedBreaks;
    } catch (error) {
      console.error("Error while sorting breaks:", error);
    }
  };

  const addSessionIntervals = async () => {
    try {
      const sortedBreaks = await sortBreaks();
      const newSessionIntervals = [];

      for (let index = 0; index < sortedBreaks.length; index++) {
        const breakItem = sortedBreaks[index];

        // create break interval
        const breakDuration = breakItem.breakDuration;
        if (ConvertTimeToMinutes({ timeObject: breakDuration }) == 0) {
          continue;
        }
        const breakInterval = {
          hours: breakDuration.hours,
          minutes: breakDuration.minutes,
          seconds: "0",
          type: "break",
        };

        // create study interval
        const studyDuration = breakItem.breakStartTime;
        console.log("studyDuration: ", studyDuration);
        // total duration of all existing intervals
        let totalIntervalDuration = newSessionIntervals.reduce(
          (acc, interval) => {
            return {
              hours: acc.hours + parseInt(interval.hours),
              minutes: acc.minutes + parseInt(interval.minutes),
              seconds: acc.seconds + parseInt(interval.seconds),
            };
          },
          { hours: 0, minutes: 0, seconds: 0 }
        );
        totalIntervalDuration = formatTime(totalIntervalDuration);
        console.log("totalIntervalDuration: ", totalIntervalDuration);
        const studyInterval = {
          hours: Math.abs(totalIntervalDuration.hours - studyDuration.hours),
          minutes: Math.abs(
            totalIntervalDuration.minutes - studyDuration.minutes
          ),
          seconds: Math.abs(
            totalIntervalDuration.seconds - studyDuration.seconds
          ),
          type: "study",
        };
        console.log("studyInterval: ", studyInterval);
        // add both the intervals to the sessionIntervals
        if (ConvertTimeToMinutes({ timeObject: studyInterval }) != 0) {
          newSessionIntervals.push(studyInterval);
        }
        newSessionIntervals.push(breakInterval);
      }

      const lastInterval = await addLastSessionInterval(newSessionIntervals);
      if (ConvertTimeToMinutes({ timeObject: lastInterval }) !== 0) {
        newSessionIntervals.push(lastInterval);
      }

      dispatch(setSessionIntervals(newSessionIntervals));
    } catch (error) {
      console.error("Error adding session intervals:", error);
    }
  };

  const dispatch = useDispatch();
  const sessionIntervals = useSelector((state) => state.sessionIntervals);
  const sessionDuration = useSelector((state) => state.sessionDuration);
  const breaks = useSelector((state) => state.breaks);

  // components for each step
  const steps = [<SetTimer />, <SetBreaks />, <SetMusic />];

  const handleNextClick = async () => {
    if (currentStep === 0) {
      // Check if both hours and minutes are zero in SetTimer component
      const { hours, minutes } = sessionDuration;
      if (ConvertTimeToMinutes({ timeObject: sessionDuration }) === 0) {
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

      // build sessionIntervals after setting all breaks and clicking next
      if (currentStep === 1) {
        await addSessionIntervals();
        setSessionIntervalCompleted(true);
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
