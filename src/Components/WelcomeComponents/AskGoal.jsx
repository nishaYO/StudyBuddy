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
    <div className="p-2 flex flex-col items-center justify-center min-h-screen">
      <div className="bg-white flex flex-col items-center w-full lg:w-1/2 p-6 border-2 rounded-lg border-[#BEADFA] shadow-lg">
        <h1 className="text-3xl font-extrabold max-w-lg mb-4 text-center">
          Set Your Daily Study Goal
        </h1>
        <div className="flex flex-row gap-7 items-center m-3">
          <div className="flex items-center">
            {/* Add up and down arrow buttons */}
            <button
              onClick={() =>
                setStreakGoal({
                  ...streakGoal,
                  hours: (parseInt(streakGoal.hours, 10) + 1).toString(),
                })
              }
              className="bg-[#D0BFFF] px-2 py-2 rounded-full mr-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
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
              className="w-20 border border-[#BEADFA] p-3 rounded-lg outline-none mr-2"
            />
            <span>hrs</span>
            {/* Add up and down arrow buttons */}
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
              className="bg-[#D0BFFF] px-2 py-2 rounded-full ml-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="w-6 h-6"
              >
                <path
                  fill-rule="evenodd"
                  d="M3.75 12a.75.75 0 01.75-.75h15a.75.75 0 010 1.5h-15a.75.75 0 01-.75-.75z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          </div>
          <div className="flex items-center">
            {/* Add up and down arrow buttons */}
            <button
              onClick={() =>
                setStreakGoal({
                  ...streakGoal,
                  minutes: (parseInt(streakGoal.minutes, 10) + 1).toString(),
                })
              }
              className="bg-[#D0BFFF] px-2 py-2 rounded-full mr-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
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
              className="w-20 border border-[#BEADFA] p-3 rounded-lg outline-none mr-2"
            />
            <span>minutes</span>
            {/* Add up and down arrow buttons */}
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
              className="bg-[#D0BFFF] px-2 py-2 rounded-full ml-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="w-6 h-6"
              >
                <path
                  fill-rule="evenodd"
                  d="M3.75 12a.75.75 0 01.75-.75h15a.75.75 0 010 1.5h-15a.75.75 0 01-.75-.75z"
                  clip-rule="evenodd"
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
          className="mx-auto mt-4 px-6 py-3 bg-[#D0BFFF] hover:bg-[#BEADFA] rounded-full font-bold"
        >
          Submit
        </button>
        <p className="mt-4 text-center">
          This will determine your streakGoal, so set accordingly!
        </p>
      </div>
    </div>
  );
}

export default AskGoal;
