import React, { useState } from "react";

function AskGoal({ handleGoalSubmit }) {
  // Retrieve streak goal from local storage on component mount
  const storedStreakGoal = JSON.parse(localStorage.getItem("streakGoal")) || { hours: "04", minutes: "0" };
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
              onClick={() => setStreakGoal({ ...streakGoal, hours: (parseInt(streakGoal.hours, 10) + 1).toString() })}
              className="bg-[#D0BFFF] px-2 py-1 rounded-full mr-2"
            >
              &#9650;
            </button>
            <input
              type="text"
              onChange={(e) => setStreakGoal({ ...streakGoal, hours: e.target.value })}
              value={streakGoal.hours}
              className="w-20 border border-[#BEADFA] p-3 rounded-lg outline-none mr-2"
            />
            <span>hrs</span>
            {/* Add up and down arrow buttons */}
            <button
              onClick={() => setStreakGoal({ ...streakGoal, hours: (Math.max(parseInt(streakGoal.hours, 10) - 1, 0)).toString() })}
              className="bg-[#D0BFFF] px-2 py-1 rounded-full ml-2"
            >
              &#9660;
            </button>
          </div>
          <div className="flex items-center">
            {/* Add up and down arrow buttons */}
            <button
              onClick={() => setStreakGoal({ ...streakGoal, minutes: (parseInt(streakGoal.minutes, 10) + 1).toString() })}
              className="bg-[#D0BFFF] px-2 py-1 rounded-full mr-2"
            >
              &#9650;
            </button>
            <input
              type="text"
              onChange={(e) => setStreakGoal({ ...streakGoal, minutes: e.target.value })}
              value={streakGoal.minutes}
              className="w-20 border border-[#BEADFA] p-3 rounded-lg outline-none mr-2"
            />
            <span>minutes</span>
            {/* Add up and down arrow buttons */}
            <button
              onClick={() => setStreakGoal({ ...streakGoal, minutes: (Math.max(parseInt(streakGoal.minutes, 10) - 1, 0)).toString() })}
              className="bg-[#D0BFFF] px-2 py-1 rounded-full ml-2"
            >
              &#9660;
            </button>
          </div>
        </div>
        <button
          onClick={() => { handleGoalSubmit(); updateLocalStorage(); }}
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
