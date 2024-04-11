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
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-400 to-yellow-200">
        <span className="text-2xl md:text-4xl mr-auto ml-auto font-bold mb-4 font-serif">{`${greeting}, ${storedName}`}</span>
        <div className="flex flex-col items-center justify-center bg-white bg-opacity-70 p-10 rounded-lg max-w-[300px] md:max-w-[750px] w-full">
          <p className="text-lg mb-2 text-lg mb-2 font-serif">
            Your daily study goal: {storedGoal.hours} hrs {storedGoal.minutes}{" "}
            minutes
          </p>
          <button
            className="px-8 py-4 bg-purple-700 hover:bg-purple-600 text-white rounded-md text-lg m-2  text-lg transition duration-300 ease-in-out"
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
