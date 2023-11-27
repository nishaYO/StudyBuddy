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
  const storedGoal = localStorage.getItem("studyGoal") || "";
  const greeting = makeSessionMessage();

  return (
    <div className="flex flex-col p-2 gap-20">
      <Navbar />
  <div className="flex flex-col items-center bg-gray-100 p-6 rounded-lg">
    <p className="text-2xl font-semibold mb-4">{`${greeting}! ${storedName}.`}</p>
    <p className="text-lg mb-2">Your daily study goal: {storedGoal}hrs</p>
    <p className="text-lg mb-4">Let's start the session.</p>
    <button
      className="px-6 py-3 bg-[#D0BFFF] hover:bg-[#BEADFA] rounded-md font-bold text-lg"
      onClick={handleStartSession}
    >
      Make a session
    </button>
  </div>
    </div>
  );
}

export default MakeSession;
