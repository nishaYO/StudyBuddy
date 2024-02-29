import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_STREAK_REPORT } from "./../../graphql/queries";

function renderCalendar() {
  // get the streakcalendar from backend
  const user = JSON.parse(localStorage.getItem("user"));
  const userID = user.id;
  const { loading, error, data } = useQuery(GET_STREAK_REPORT, {
    variables: { userID },
  });

  useEffect(() => {
    if (data) {
      console.log("Streak reports data:", data);
    }
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Convert streak report object into an array of years
  const yearsData = Object.entries(data.getStreakReports.years[0]).slice(0, -2); //excluding months and id elements from years

  return (
    <div>
      {yearsData.map(([year, monthsData]) => (
        <div key={year} className="mb-8">
          <h2 className="text-2xl font-bold mb-4">{year}</h2>
          {Object.entries(monthsData).map(([month, monthData]) => (
            <div key={month} className="mb-4">
              <h3 className="text-xl font-semibold mb-2">{month}</h3>
              <div className="grid grid-cols-7 gap-2">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                  (day) => (
                    <div key={day} className="text-center font-semibold">
                      {day}
                    </div>
                  )
                )}
                {Object.values(monthData).map((dateData) => (
                  <div
                    key={dateData.date}
                    className={`border p-2 text-center ${
                      dateData.studyTimePercent > 50
                        ? "bg-green-400"
                        : "bg-blue-400"
                    } border-2 border-[#BEADFA]`}
                  >
                    {dateData.date}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default renderCalendar;
