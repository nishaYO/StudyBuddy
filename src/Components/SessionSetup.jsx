import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "wouter";
import { setBreaks } from "../redux/breakslice";
import { setSessionIntervals } from "./../redux/sessionIntervals";
import { setSessionStartTime } from "./../redux/sessionStartTime";
import ConvertTimeToMinutes from "./Services/ConvertTimeToMinutes";
import SetBreaks from "./SessionSetupComponents/SetBreaks";
import ConvertPixelToTime from "./SessionSetupComponents/SetBreaksComponents/ConvertPixelToTime";
import SetMusic from "./SessionSetupComponents/SetMusic";
import SetTimer from "./SessionSetupComponents/SetTimer";

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
    
    const totalIntervalInMinutes = ConvertTimeToMinutes({
      timeObject: totalIntervalDuration,
    });
    const sessionDurationInMinutes = ConvertTimeToMinutes({
      timeObject: sessionDuration,
    });
    
    const lastIntervalInMinutes = Math.abs(
      totalIntervalInMinutes - sessionDurationInMinutes
    );
    const { hours, minutes, seconds } = ConvertPixelToTime({
      totalMinutes: lastIntervalInMinutes,
    });
    const lastIntervalDuration = {
      hours: hours,
      minutes: minutes,
      seconds: seconds,
      type: "study",
    };
    // console.log("totalIntervalInMinutes", totalIntervalInMinutes)
    // console.log("totalIntervalDuration", totalIntervalDuration)
    // console.log("lastIntervalDuration", lastIntervalDuration)
    // console.log("lastIntervalInMinutes", lastIntervalInMinutes)
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
      // console.log("sortedBreaks:", sortedBreaks);
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
          seconds: 0,
          type: "break",
        };

        // create study interval
        const studyDuration = breakItem.breakStartTime;
        // console.log("studyDuration: ", studyDuration);
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
        // console.log("totalIntervalDuration: ", totalIntervalDuration);
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
        // console.log("studyInterval: ", studyInterval);
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
          const startTime = Date.now();
          dispatch(setSessionStartTime(startTime));
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
    <div className="flex flex-col font-mono bg-[#E5DCFA] p-0 min-h-screen">
      {/* <div className="fixed w-full top-0">
      </div> */}
      <div className="flex min-h-screen">
        {/* exclude from prod */} 
        {/* <div className="fixed left-0">
          <SidePanel />
        </div> */}
        <div className="flex flex-col items-center justify-center w-full">
          <div>
            {/* Main Box in the Center */}
            <div className="mb-8">
              {/* Ensure proper spacing for the content */}
              <div className="max-w-screen-md mx-auto">
                {steps[currentStep]}
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between p-3">
              <button
                className="bg-purple-500 text-white px-4 py-2 rounded-md"
                onClick={handlePreviousClick}
              >
                Previous
              </button>
              <button
                className="bg-purple-500 text-white px-4 py-2 rounded-md"
                onClick={handleNextClick}
              >
                {currentStep === steps.length - 1 ? "Start Session" : "Next"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SessionSetup;
