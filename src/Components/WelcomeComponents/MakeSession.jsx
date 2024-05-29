import React from "react";

const makeSessionMessage = () => {
  const now = new Date();
  const hours = now.getHours();
  let greeting = "Good ";

  if (hours >= 5 && hours < 12) {
    greeting += "morning";
  } else if (hours >= 12 && hours < 18) {
    greeting += "afternoon";
  } else {
    greeting += "evening";
  }

  return greeting;
};

function MakeSession({ handleStartSession }) {
  const storedName = localStorage.getItem("name") || "";
  const storedGoal = JSON.parse(localStorage.getItem("streakGoal")) || {
    hours: "04",
    minutes: "0",
  };

  const greeting = makeSessionMessage();
  return (
    <div>

      <div className="flex flex-col items-center justify-center min-h-screen bg-[#e5dcfa]">

        <div className="flex flex-col items-center justify-center bg-white bg-opacity-70 p-10 rounded-lg max-w-[300px] md:max-w-[750px] w-full">
          <span className="text-2xl md:text-4xl font-bold mb-4 font-comic-sans">{`${greeting}, ${storedName}`}</span>
          <p className="text-lg mb-2 font-comic-sans">
            Yay! 🎉 Your daily study goal: {storedGoal.hours} hrs {storedGoal.minutes} minutes of learning fun awaits you!
          </p>
          <button
            className="px-8 py-4 bg-purple-700 hover:bg-purple-600 text-white rounded-md text-lg m-2 text-lg transition duration-300 ease-in-out"
            onClick={handleStartSession}
          >
            Let's Start
          </button>
        </div>
      </div>
    </div>
  );
}

export default MakeSession;
