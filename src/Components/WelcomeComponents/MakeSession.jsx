import Navbar from "../Navbar";

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
      <Navbar />
      <div className="flex flex-col items-center justify-center p-2 gap-20 min-h-screen ">
        <div className="flex flex-col items-center bg-[#BEADFA] p-6 rounded-lg w-full lg:w-1/2">
          <p className="text-2xl font-semibold mb-4">{`${greeting}! ${storedName}.`}</p>
          <p className="text-lg mb-2">
            Your daily study goal: {storedGoal.hours}hrs {storedGoal.minutes}
            minutes
          </p>
          <p className="text-lg mb-4">Let's start the session.</p>
          <button
            className="px-6 py-3 bg-[#D0BFFF] hover:bg-[#BEADFA] border border-white rounded-md font-bold text-lg"
            onClick={handleStartSession}
          >
            Make a session
          </button>
        </div>
      </div>
    </div>
  );
}

export default MakeSession;
