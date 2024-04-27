import React, { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useSelector } from "react-redux";
import Confetti from "react-confetti";

const SessionCompleted = () => {
  const [location, navigate] = useLocation();
  const sessionIntervals = useSelector((state) => state.sessionIntervals);
  const [name, setName] = useState("");

  // Retrieve name from local storage on component mount
  useEffect(() => {
    const storedName = localStorage.getItem("name");
    if (storedName) {
      setName(storedName);
    }
  }, []);

  const calculateTotalStudyDuration = () => {
    return sessionIntervals
      .filter((interval) => interval.type === "study")
      .reduce(
        (totalDuration, studyInterval) => {
          return {
            hours: totalDuration.hours + parseInt(studyInterval.hours),
            minutes: totalDuration.minutes + parseInt(studyInterval.minutes),
            seconds: totalDuration.seconds + parseInt(studyInterval.seconds),
          };
        },
        { hours: 0, minutes: 0, seconds: 0 }
      );
  };

  const totalStudyDuration = 2;

  return (
    <div className="flex flex-col h-screen bg-red-100 w-[1600px]">
      <div className="flex items-center justify-center h-screen">
        <Confetti numberOfPieces={200} recycle={false} />
        <div className="bg-white p-8 rounded shadow-md text-center mx-auto relative">
          <h2 className="text-3xl font-semibold mb-4">
            Congratulations for completing the session, {name}!
          </h2>
          <div className="flex justify-center mb-4">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
              onClick={() => {
                navigate("/session-setup");
                window.location.reload();
              }}
            >
              Make a new session
            </button>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded"
              onClick={() => navigate("/help")}
            >
              Share feedback
            </button>
          </div>
          {/* <div className="mt-4">
            <p className="text-gray-700">
              Total Study Time in the session: {totalStudyDuration} hours
            </p>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default SessionCompleted;
