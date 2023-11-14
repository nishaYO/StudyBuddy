function StudyTime() {
  return <div>hello i am Studytime component</div>;
}

function BreakTime() {
  return <div>hello i am Breaktime component</div>;
}

function SessionStarted({ sessionIntervals, sessionIndex}) {
  const study = sessionIntervals[sessionIndex].type === "study";

  return (
    <div className="m-5">
      <div className="bg-white flex flex-col items-center w-full lg:w-1/2 p-5 m-4 border-2 rounded-lg border-[#BEADFA] shadow-lg">
        hello this is sessionStarted page
      </div>
      {study ? <StudyTime /> : <BreakTime />}
    </div>
  );
}

export default SessionStarted;
