import React, { useState } from "react";
import { plusIcon } from "../SVG";

function AskGoal({ handleGoalSubmit }) {
  // Retrieve streak goal from local storage on component mount
  const storedStreakGoal = JSON.parse(localStorage.getItem("streakGoal")) || {
    hours: "04",
    minutes: "0",
  };
  const [streakGoal, setStreakGoal] = useState(storedStreakGoal);

  // Update local storage when streak goal changes
  const updateLocalStorage = () => {
    localStorage.setItem("streakGoal", JSON.stringify(streakGoal));
  };

  return (
    <div className="p-4 flex flex-col items-center justify-center min-h-screen">
      <div className="bg-white flex flex-col items-center w-full lg:w-3/4 p-8 border-2 rounded-lg border-[#BEADFA] shadow-lg">
        <h1 className="text-4xl font-extrabold mb-6 text-center">
          Set Your Daily Study Goal
        </h1>
        <div>
          <div className="flex justify-between items-center m-2">
            {/* Add up and down arrow buttons */}
            <button
              onClick={() =>
                setStreakGoal({
                  ...streakGoal,
                  hours: (parseInt(streakGoal.hours, 10) + 1).toString(),
                })
              }
              className="bg-[#D0BFFF] px-3 py-3 rounded-full mr-3"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-8 h-8"
              >
                <path
                  fillRule="evenodd"
                  d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <input
              type="text"
              onChange={(e) =>
                setStreakGoal({ ...streakGoal, hours: e.target.value })
              }
              value={streakGoal.hours}
              className="w-16 border border-[#BEADFA] p-3 rounded-lg outline-none text-center"
            />
            <span className="ml-2">hours</span>
            {/* Add up and down arrow buttons */}
            <button
              onClick={() =>
                setStreakGoal({
                  ...streakGoal,
                  hours: Math.max(parseInt(streakGoal.hours, 10) - 1, 0).toString(),
                })
              }
              className="bg-[#D0BFFF] px-3 py-3 rounded-full ml-3"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-8 h-8"
              >
                <path
                  fillRule="evenodd"
                  d="M3.75 12a.75.75 0 01.75-.75h15a.75.75 0 010 1.5h-15a.75.75 0 01-.75-.75z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
          <div className="flex justify-between items-center m-2">
            {/* Add up and down arrow buttons */}
            <button
              onClick={() =>
                setStreakGoal({
                  ...streakGoal,
                  minutes: (parseInt(streakGoal.minutes, 10) + 1).toString(),
                })
              }
              className="bg-[#D0BFFF] px-3 py-3 rounded-full mr-3"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-8 h-8"
              >
                <path
                  fillRule="evenodd"
                  d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <input
              type="text"
              onChange={(e) =>
                setStreakGoal({ ...streakGoal, minutes: e.target.value })
              }
              value={streakGoal.minutes}
              className="w-16 border border-[#BEADFA] p-3 rounded-lg outline-none text-center"
            />
            <span className="ml-2">minutes</span>
            {/* Add up and down arrow buttons */}
            <button
              onClick={() =>
                setStreakGoal({
                  ...streakGoal,
                  minutes: Math.max(parseInt(streakGoal.minutes, 10) - 1, 0).toString(),
                })
              }
              className="bg-[#D0BFFF] px-3 py-3 rounded-full ml-3"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-8 h-8"
              >
                <path
                  fillRule="evenodd"
                  d="M3.75 12a.75.75 0 01.75-.75h15a.75.75 0 010 1.5h-15a.75.75 0 01-.75-.75z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
        <button
          onClick={() => {
            handleGoalSubmit();
            updateLocalStorage();
          }}
          className="w-full max-w-md mx-auto mt-4 px-8 py-4 bg-[#D0BFFF] hover:bg-[#BEADFA] rounded-full font-bold"
        >
          Submit
        </button>
        <p className="mt-8 text-center text-lg">
          This will determine your streak goal
        </p>
      </div>
    </div>
  );
  
}

export default AskGoal;
