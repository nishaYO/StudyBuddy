function isStudyTime(breaks, sessionDuration, totalTimeInSession) {
    // Convert everything to seconds for easier comparison
    const sessionDurationInSeconds =
      parseInt(sessionDuration.hours) * 3600 +
      parseInt(sessionDuration.minutes) * 60 +
      parseInt(sessionDuration.seconds);
  
    const totalTimeInSeconds =
      parseInt(totalTimeInSession.hours) * 3600 +
      parseInt(totalTimeInSession.minutes) * 60 +
      parseInt(totalTimeInSession.seconds);
  
    // Calculate current time within the session
    const currentTimeInSeconds = totalTimeInSeconds % sessionDurationInSeconds;
  
    // Check if the current time falls within any break period
    for (const breakInfo of breaks) {
      const breakStartTimeInSeconds =
        parseInt(breakInfo.breakStartTime.hours) * 3600 +
        parseInt(breakInfo.breakStartTime.minutes) * 60 +
        parseInt(breakInfo.breakStartTime.seconds);
  
      const breakEndTimeInSeconds =
        breakStartTimeInSeconds +
        parseInt(breakInfo.breakDuration.hours) * 3600 +
        parseInt(breakInfo.breakDuration.minutes) * 60 +
        parseInt(breakInfo.breakDuration.seconds);
  
      if (
        currentTimeInSeconds >= breakStartTimeInSeconds &&
        currentTimeInSeconds < breakEndTimeInSeconds
      ) {
        return false; // It's break time
      }
    }
  
    return true; // It's study time
  }
  
  // Example usage:
  const breaks = [
    {
      breakDuration: { hours: '0', minutes: '15', seconds: '0' },
      breakStartTime: { hours: '1', minutes: '0', seconds: '0' },
    },
    {
      breakDuration: { hours: '0', minutes: '15', seconds: '0' },
      breakStartTime: { hours: '2', minutes: '15', seconds: '0' },
    },
    {
      breakDuration: { hours: '0', minutes: '10', seconds: '0' },
      breakStartTime: { hours: '3', minutes: '0', seconds: '0' },
    },
  ];
//  const sessionIntervals = [
//     { hours: 0, minutes: 0, seconds: 12, type: "study" },
//     { hours: 0, minutes: 0, seconds: 5, type: "break" },
//     { hours: 0, minutes: 0, seconds: 20, type: "study" },
//     { hours: 0, minutes: 0, seconds: 10, type: "break" },
//     { hours: 0, minutes: 0, seconds: 13, type: "study" },
//   ];
 const sessionIntervals = [
    { hours: '1', minutes: '0', seconds: '0' , type: "study" },
    { hours: '0', minutes: '15', seconds: '0' , type: "break" },
    { hours: '', minutes: '0', seconds: '0' , type: "study" },
    { hours: '0', minutes: '0', seconds: '15' , type: "break" },
    { hours: '0', minutes: '0', seconds: '0' , type: "study" },
    { hours: '0', minutes: '0', seconds: '10' , type: "break" },
    { hours: '0', minutes: '0', seconds: '0' , type: "study" },
  ];

  const sessionDuration = { hours: '3', minutes: '45', seconds: '0' };
  const totalTimeInSession = { hours: '1', minutes: '5', seconds: '0' };
  
  const studyTime = isStudyTime(breaks, sessionDuration, totalTimeInSession);
  console.log(studyTime); // Output: true
  