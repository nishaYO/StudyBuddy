import React, { useState } from "react";
import { plusIcon } from "../SVG";
import {FaArrowUp,FaArrowDown} from "react-icons/fa"
function AskGoal({ handleGoalSubmit }) {
  // Retrieve streak goal from local storage on component mount
  const storedStreakGoal =
    JSON.parse(localStorage.getItem("streakGoal")) || {
      hours: "04",
      minutes: "0",
    };
  const [streakGoal, setStreakGoal] = useState(storedStreakGoal);

  // Update local storage when streak goal changes
  const updateLocalStorage = () => {
    localStorage.setItem("streakGoal", JSON.stringify(streakGoal));
  };

  return (
    <div className="p-3 flex flex-col items-center justify-center min-h-screen">
      <div className="bg-white w-full lg:w-1/2 p-6 border-2 rounded-lg border-[#BEADFA] shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6">
          Set Your Daily Study Goal
        </h1>
        <div className="flex p-2 border border-gray-300 rounded-lg lg:flex-row items-center justify-center gap-4">
          <div className="flex flex-col items-center gap-2">
            <span className="font-bold">Hours</span>
            <div className="flex flex-col items-center gap-2">
            <button
              onClick={() =>
                setStreakGoal({
                  ...streakGoal,
                  hours: (parseInt(streakGoal.hours, 10) + 1).toString(),
                })
              }
              className="bg-[#D0BFFF] px-2 py-2 rounded-lg"
            >
              <FaArrowUp/>
            </button>
            <input
              type="number"
              onChange={(e) =>
                setStreakGoal({ ...streakGoal, hours: e.target.value })
              }
              value={streakGoal.hours}
              className="w-20 border border-[#BEADFA] p-3 rounded-lg text-center"
              aria-label="Hours"
            />
           <button
              onClick={() =>
                setStreakGoal({
                  ...streakGoal,
                  hours: Math.max(
                    parseInt(streakGoal.hours, 10) - 1,
                    0
                  ).toString(),
                })
              }
              className="bg-[#D0BFFF] px-2 py-2 rounded-lg"
            >
              <FaArrowDown/>
            </button>
            </div>
          </div>

          {/* @dev section for minutes */}
          <div className="flex flex-col items-center gap-2">
            <span className="font-bold">Minutes</span>
            <div className="flex flex-col items-center gap-2">
            <button
              onClick={() =>
                setStreakGoal({
                  ...streakGoal,
                  minutes: (parseInt(streakGoal.minutes, 10) + 1).toString(),
                })
              }
              className="bg-[#D0BFFF] px-2 py-2 rounded-lg"
            >
              <FaArrowUp/>
            </button>
            {/* get the minutes */}
            <input
              type="number"
              onChange={(e) =>
                setStreakGoal({ ...streakGoal, minutes: e.target.value })
              }
              value={streakGoal.minutes}
              className="w-20 border border-[#BEADFA] p-3 rounded-lg text-center"
              aria-label="Minutes"
            />

            <button
              onClick={() =>
                setStreakGoal({
                  ...streakGoal,
                  minutes: Math.max(
                    parseInt(streakGoal.minutes, 10) - 1,
                    0
                  ).toString(),
                })
              }
              className="bg-[#D0BFFF] px-2 py-2 rounded-lg"
            >
              <FaArrowDown/>
            </button>
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-6">
          <button
            onClick={() => {
              handleGoalSubmit();
              updateLocalStorage();
            }}
            className="px-6 py-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded-full font-semibold"
          >
            Submit
          </button>
        </div>
        <p className="mt-4 text-center text-gray-600 italic">
          This will determine your study streak goal, so set it accordingly!
        </p>
      </div>
    </div>
  );
}

export default AskGoal;
