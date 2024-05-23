import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_MAIN_STATS } from "../../graphql/queries";
import { useLocation } from "wouter";
import StreakCalendar from "./StreakCalendar";

function Reports() {
  const [location, navigate] = useLocation();
  const user = JSON.parse(localStorage.getItem("user"));
  const userID = user.id;
  const { loading, error, data } = useQuery(GET_MAIN_STATS, {
    variables: { userID },
  });

  const handlePreviousClick = () => {
    navigate("/");
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  console.log("data", data);
  // todos
  // adding first three to main stats
  // sync teh days and dates in streakcalendar
  // Extracting values from the data object
  const {
    totalStudyDuration,
    latestSession,
  } = data.getMainStats;

  // Function to convert minutes to hours and minutes format
  const convertMinutesToHoursAndMinutes = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  };

  // Constructing mainstats object with initial values
  const mainstats = {
    // "current Streak": "1 day",
    // "Highest Streak": "1 day",
    // "Highest Hours Session": "6hrs 33mins",
    // taken from backend
    "last session was ended at": new Date(parseFloat(latestSession.endTime)).toLocaleString(),
    "last session studyduration": convertMinutesToHoursAndMinutes(latestSession.sessionDuration),
    "total Hours so far": convertMinutesToHoursAndMinutes(totalStudyDuration.total),
    "today total Hours": convertMinutesToHoursAndMinutes(totalStudyDuration.today),
    "week total Hours": convertMinutesToHoursAndMinutes(totalStudyDuration.week),
    "month total Hours": convertMinutesToHoursAndMinutes(totalStudyDuration.month),
  };

  // Filter out key-value pairs with invalid values
  const filteredMainStats = Object.entries(mainstats).filter(([key, value]) => value);

  return (
    <div className="flex flex-col">
      <button
        className="bg-purple-500 text-white m-2 max-w-[100px] p-3 rounded font-semibold hover:bg-purple-600 transition duration-300"
        onClick={handlePreviousClick}
      >
        Back
      </button>
      <h2 className="text-3xl m-auto font-bold mb-4 text-purple-800">See your Reports📝</h2>
      <div className="bg-white w-full max-w-[500px] lg:max-w-[750px] m-auto p-5 m-4 border-2 rounded-lg border-purple-200 shadow-lg">
        <ul>
          {filteredMainStats.map(([key, value]) => (
            <li key={key} className="m-4 flex justify-between text-lg text-purple-900">
              <span>{key}</span>
              <span>{value}</span>
            </li>
          ))}
        </ul>
      </div>
      <StreakCalendar />
    </div>
  );
}

export default Reports;
