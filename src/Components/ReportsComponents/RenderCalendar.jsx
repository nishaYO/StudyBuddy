import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_STREAK_REPORTS } from "./../../graphql/queries";

function RenderCalendar() {
  // get the streakcalendar from backend
  const user = JSON.parse(localStorage.getItem("user"));
  const userID = user.id;
  const { loading, error, data } = useQuery(GET_STREAK_REPORTS, {
    variables: { userID },
  });

  useEffect(() => {
    if (data) {
      console.log("Streak reports data:", data);
    }
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const transformToCalendar = (calendar) => {
    const structuredCalendar = {};

    const months = [
      "January", "February", "March", "April", "May", "June", 
      "July", "August", "September", "October", "November", "December"
    ];

    calendar.forEach((day) => {
      const date = new Date(parseInt(day.date));
      const year = date.getFullYear();
      const monthIndex = date.getMonth();
      const monthName = months[monthIndex];
      const dayOfMonth = date.getDate();

      if (!structuredCalendar[year]) {
        structuredCalendar[year] = {};
      }

      if (!structuredCalendar[year][monthName]) {
        structuredCalendar[year][monthName] = {};
      }

      if (!structuredCalendar[year][monthName][dayOfMonth]) {
        structuredCalendar[year][monthName][dayOfMonth] = {
          studyTime: day.studyTime,
          studyTimePercent: day.studyTimePercent
        };
      } else {
        // If a day entry already exists, update its studyTime and studyTimePercent
        structuredCalendar[year][monthName][dayOfMonth].studyTime = day.studyTime;
        structuredCalendar[year][monthName][dayOfMonth].studyTimePercent = day.studyTimePercent;
      }
    });

    return structuredCalendar;
};



  // Access streak report data
  const { calendar } = data.getStreakReports;
  const structuredCalendar = transformToCalendar(calendar);
  console.log("structuredCalendar", structuredCalendar);

  return (
    <div className="flex w-full">
      {Object.entries(structuredCalendar).map(([year, monthsData]) => (
        <div key={year} className="m-8 ">
          <h2 className="text-2xl font-bold mb-4">{year}</h2>
          {Object.entries(monthsData).map(([month, monthData]) => (
            <div key={month} className="mb-4">
              <h3 className="text-xl font-semibold mb-2">{month}</h3>
              <div className="grid grid-cols-7 gap-2 p-3">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                  (day) => (
                    <div
                      key={day}
                      className="text-center font-semibold border border-purple-600"
                    >
                      {day}
                    </div>
                  )
                )}
                {Object.entries(monthData).map(([dayOfMonth, dateData]) => {
                  const fillHeight = `${Math.min(
                    dateData.studyTimePercent,
                    100
                  )}%`; // Calculate the height to fill, ensuring it doesn't exceed 100%
  
                  return (
                    <div
                      key={dayOfMonth}
                      className="border p-2 text-center border-2 border-[#BEADFA] cursor-pointer rounded-lg"
                      style={{
                        position: "relative",
                      }}
                      title={`${dateData.studyTime.hours}h ${dateData.studyTime.minutes}m`}
                    >
                      <div
                        className="absolute bottom-0 left-0 right-0"
                        style={{
                          height: fillHeight,
                          backgroundColor: "#BEADFA",
                        }}
                      />
                      <div className="relative z-10">{dayOfMonth}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
  
}

export default RenderCalendar;
