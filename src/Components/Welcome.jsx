import React, { useState, useEffect } from "react";
import { useLocation } from "wouter";
import AskName from "./Welcome/AskName";
import AskGoal from "./Welcome/AskGoal";
import MakeSession from "./Welcome/MakeSession";

function Welcome() {
  const [location, navigate] = useLocation();
  const [nameSubmitted, setNameSubmitted] = useState(false);
  const [goalSubmitted, setGoalSubmitted] = useState(false);

  const handleNameSubmit = () => {
    setNameSubmitted(true);
  };

  const handleGoalSubmit = () => {
    setGoalSubmitted(true);
  };

  const handleStartSession = () => {
    navigate("/session-setup");
  };

  const storedName = localStorage.getItem("name");
  const storedGoal = localStorage.getItem("studyGoal");

  const isFirstTimeVisit = storedName && storedGoal? false : true;

  useEffect(() => {
    if (storedName) {
      setNameSubmitted(true);
    }
  }, [storedName]);

  return (
    <div>
      {isFirstTimeVisit && !nameSubmitted ? (
        <AskName handleNameSubmit={handleNameSubmit} />
      ) : isFirstTimeVisit && nameSubmitted && !goalSubmitted ? (
        <AskGoal handleGoalSubmit={handleGoalSubmit} />
      ) : (
        <MakeSession handleStartSession={handleStartSession} />
      )}
    </div>
  );
}

export default Welcome;
