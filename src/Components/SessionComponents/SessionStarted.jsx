import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import StudyTime from "./StudyTime";
import BreakTime from "./BreakTime";

const SessionStarted = ({handleSessionCompleted}) => {
  const studyDuration = {hours: '0', minutes: '30', seconds: '0'};
  const breakDuration = {hours: '0', minutes: '30', seconds: '0'};
  
  return (
    <div className="w-4/5 h-4/5 flex items-center justify-center h-screen w-100">
      {/* <StudyTime studyDuration={studyDuration} /> */}
      <BreakTime breakDuration={breakDuration} />
    </div>

  )
}

export default SessionStarted;
