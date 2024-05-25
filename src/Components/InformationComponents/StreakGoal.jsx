import { useQuery } from "@apollo/client";
import { GET_CURRENT_STREAK } from "../../graphql/queries";
import React, { useState } from "react";

const StreakGoal = () => {
    const [isHovering, setIsHovering] = useState(false);
  const streakGoal = JSON.parse(localStorage.getItem("streakGoal"));
  const user = JSON.parse(localStorage.getItem("user"));
  // GraphQL query to fetch the current streak counter
  const {
    data: streakData,
    loading: streakLoading,
    error: streakError,
  } = useQuery(GET_CURRENT_STREAK, {
    variables: { userID: user.id },
  });
  // Function to render streak button with the currenti streak counter
  const renderStreakButton = () => {
    if (streakLoading) return <div>Loading...</div>;
    if (streakError) return <div>{streakError.message}</div>;

    const streakCounter = streakData ? streakData.getCurrentStreak : 0;
    // Determine whether to display "Day" or "Days" based on streakCounter
    const daysLabel = streakCounter === 1 ? "Day" : "Days";

    const handleMouseEnter = () => {
      setIsHovering(true);
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
    };
    return (
      <div className="relative hidden md:block">
        <button
          className="bg-[#BEADFA] p-1 border-2 border-black"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={() => {
            setTimeout(() => {
              handleMouseLeave();
            }, 5000);
          }}
          
        >
          Streak: {streakCounter} {daysLabel}
        </button>
        {/* {isHovering && (
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 bg-white p-4 rounded-lg shadow-lg z-20">
            <button onClick={handleMouseLeave} className="text-gray-500 hover:text-gray-700">
          Close
        </button>
            <p>
              Streak Goal: {streakGoal.hours} hours {streakGoal.minutes}{" "}
              minutes. The current streak updates if you study for{" "}
              {streakGoal.hours} hours {streakGoal.minutes} minutes a day.
            </p>
            <button className="bg-[#BEADFA] p-1 border-2">change streak goal</button>
          </div>
        )} */}
      </div>
    );
  };

  return <div>{renderStreakButton()}</div>;
};

export default StreakGoal;
