import React, { useState, useEffect } from "react";

const SessionStats = ({isStudyTime, isPaused}) => {
  const [totalStudyTime, setTotalStudyTime] = useState(0);

  // all stats should be based on teh countdown value to avoid mismatch in timings.
  const stats = {
    // total study time should increase after every minute of studytime completion
    TotalStudyDurationSoFar: totalStudyTime,
    // totalsession duration redux element - current session point = current interval's current time
    // take sessionintervals redux and counter value and current countdown
    TimeLeft: "2",
  };

  // show stats in minutes
  const formatStats = (stats) => {
    const formattedStats = {};

    // Format each key in stats
    Object.entries(stats).forEach(([key, value]) => {
      const formattedKey = key.replace(/([a-z])([A-Z])/g, "$1 $2"); // Add space between camelCase
      const formattedValue = parseInt(value, 10); // Convert value to integer

      formattedStats[formattedKey] = formattedValue;
    });

    return Object.entries(formattedStats).map(([key, value]) => (
      <div key={key}>
        {key}: {value}
      </div>
    ));
  };

  /// todo: add  make sure the totalstSwr stops when the session ends
  // logic for totalstudyduration counter
  useEffect(() => {
    let interval;

    if (isStudyTime && !isPaused) {
      interval = setInterval(() => {
        setTotalStudyTime((prevTotal) => prevTotal + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isStudyTime, isPaused]);

  const sessionStats = formatStats(stats);
  return (
    <div className="bg-purple-400 p-2 rounded w-[400px] flex flex-row items-center justify-center gap-10">
      {sessionStats}
    </div>
  );
};

export default SessionStats;
