import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faPlus } from "@fortawesome/free-solid-svg-icons";
import { setBreaks } from "../../redux/breakslice";
import { useDispatch, useSelector } from "react-redux";

const SetBreaks = ({ totalDuration }) => {
  const dispatch = useDispatch();
  const breaks = useSelector((state) => state.breaks);

  useEffect(() => {
    // Log breaks to the console whenever it changes
    console.log(breaks);
  }, [breaks]);

  // Function to add a new break
  const addBreak = () => {
    const newBreaks = [
      ...breaks,
      {
        breakDuration: { hours: '', minutes: '', seconds: '' },
        studyDuration: { hours: '', minutes: '', seconds: '' },
      },
    ];
    dispatch(setBreaks(newBreaks));
  };

  // Function to remove a break at a specific index
  const removeBreak = (index) => {
    const newBreaks = [...breaks];
    newBreaks.splice(index, 1);
    dispatch(setBreaks(newBreaks));
  };
 
  // Function to handle changes in break durations
  const handleBreakChange = (event, index, field) => {
    const newBreaks = breaks.map((breakItem, i) => {
      if (i === index) {
        // Update the specific field in the break duration
        return {
          ...breakItem,
          breakDuration: {
            ...breakItem.breakDuration,
            [field]: parseInt(event.target.value, 10) || 0,
          },
        };
      }
      return breakItem;
    });
  
    dispatch(setBreaks(newBreaks));
  };

  return (
    <div className="container mx-auto mt-8 p-8 bg-gray-100 ">
      <h1 className="text-4xl font-bold mb-6">Set The Breaks</h1>
      <div className="space-y-4 font-mono  bg-[#FFF3DA] ">
        {breaks.map((breakItem, index) => (
          <div key={index} className="space-y-2 border-2 rounded-lg border-[#BEADFA]">
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  placeholder="Hours"
                  onChange={(event) =>
                    handleBreakChange(event, index, "breakDuration.hours")
                  }
                  className="border rounded p-2 text-sm w-1/4"
                />
                <span>hours</span>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  placeholder="Minutes"
                  onChange={(event) =>
                    handleBreakChange(event, index, "breakDuration.minutes")
                  }
                  className="border rounded p-2 text-sm w-1/4"
                />
                <span>minutes</span>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  placeholder="Seconds"
                  onChange={(event) =>
                    handleBreakChange(event, index, "breakDuration.seconds")
                  }
                  className="border rounded p-2 text-sm w-1/4"
                />
                <span>seconds</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  placeholder="Hours"
                  onChange={(event) =>
                    handleBreakChange(event, index, "studyDuration.hours")
                  }
                  className="border rounded p-2 text-sm w-1/4"
                />
                <span>hours</span>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  placeholder="Minutes"
                  onChange={(event) =>
                    handleBreakChange(event, index, "studyDuration.minutes")
                  }
                  className="border rounded p-2 text-sm w-1/4"
                />
                <span>minutes</span>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  placeholder="Seconds"
                  onChange={(event) =>
                    handleBreakChange(event, index, "studyDuration.seconds")
                  }
                  className="border rounded p-2 text-sm w-1/4"
                />
                <span>seconds</span>
              </div>
              <button
                onClick={() => removeBreak(index)}
                className="p-2 bg-red-500 text-white rounded text-sm"
              >
                <FontAwesomeIcon icon={faTrashAlt} />
              </button>
            </div>
          </div>
        ))}
        <button
          onClick={addBreak}
          className="p-2 bg-green-500 text-white rounded text-sm"
        >
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>
    </div>
  );
  
  
  
};

export default SetBreaks;
