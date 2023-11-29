import React, { useState } from "react";

function AskGoal({ handleGoalSubmit }) {

  // store goal in localstorage
  const [studyGoal, setStudyGoal] = useState("");
  localStorage.setItem("studyGoal", studyGoal);

  return (
    <div className="p-2 flex flex-col items-center justify-center min-h-screen">
      <div className="bg-white flex flex-col items-center h-80 w-full lg:w-1/2 p-3 border-2 rounded-lg border-[#BEADFA] shadow-lg">
        <h1 className="text-3xl font-extrabold max-w-lg p-3 text-center">
          Set Your Daily Study Goal
        </h1>
        <input
          type="text"
          onChange={(e) => setStudyGoal(e.target.value)}
          placeholder="Please Enter Study Goal..."
          className="mt-14 w-80 border border-[#BEADFA] p-3 rounded-lg"
        />hrs
        <button
          onClick={handleGoalSubmit}
          className="mx-auto mt-3 px-5 py-2 bg-[#D0BFFF] hover:bg-[#BEADFA] rounded font-bold"
        >
          Submit
        </button>
      </div>
      <p className="mt-3">This will determine your streak, so set accordingly!</p>
    </div>
  );
}

export default AskGoal;
