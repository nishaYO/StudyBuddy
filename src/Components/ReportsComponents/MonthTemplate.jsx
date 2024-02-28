import React, { useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
import { GET_STREAK_REPORT } from "./../../graphql/queries";

const MonthTemplate = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const userID = user.id;
  const { loading, error, data } = useQuery(GET_STREAK_REPORT, {
    variables: { userID },
  });

  useEffect(() => {
    if (data) {
      console.log("Streak reportss data:", data);
    }
  }, [data]);

  // Example data for dates
  const exampleData = [
    { date: 1, status: "met" },
    { date: 2, status: "exceeded" },
  ];

  const month = "January";
  const year = 2023;
  const dates = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
  ];

  const dateSquares = dates.map((date) => {
    const dateData = exampleData.find((data) => data.date === date);

    const squareStyle = dateData
      ? dateData.status === "met"
        ? "bg-green-400"
        : "bg-blue-400"
      : "";

    return (
      <div
        key={date}
        className={`border p-2 text-center ${squareStyle} border-2 border-[#BEADFA]`}
      >
        {date}
      </div>
    );
  });

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4">{`${month} ${year}`}</h2>
      <div className="grid grid-cols-7 gap-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="text-center font-semibold ">
            {day}
          </div>
        ))}
        {dateSquares}
      </div>
    </div>
  );
};

export default MonthTemplate;
