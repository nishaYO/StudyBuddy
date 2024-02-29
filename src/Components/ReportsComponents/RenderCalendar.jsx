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
    <div className="flex">
      {yearsData.map(([year, monthsData]) => (
        <div key={year} className="m-8 ml-10 pl-10">
          <h2 className="text-2xl font-bold mb-4">{year}</h2>
          {Object.entries(monthsData).map(([month, monthData]) => (
            <div key={month} className="mb-4">
              <h3 className="text-xl font-semibold mb-2">{month}</h3>
              <div className="grid grid-cols-7 gap-2">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, index) => (
                  <div key={day + index} className="text-center font-semibold">
                    {day}
                  </div>
                ))}
                {Object.values(monthData).map((dateData, index) => {
                  const startDate = new Date(`${year}-${month}-01`); // Get the date object for the first day of the month
                  const dayOfWeek = startDate.getDay(); // Get the day of the week for the first day
                  const emptyCells = Array.from({ length: dayOfWeek }, (_, i) => (
                    <div key={`empty${i}`} className="border p-2 text-center rounded-lg" />
                  ));
                  const fillHeight = `${Math.min(dateData.studyTimePercent, 100)}%`; // Calculate the height to fill, ensuring it doesn't exceed 100%
  
                  return (
                    <>
                      {index === 0 && emptyCells} {/* Render empty cells for the first week */}
                      <div
                        key={dateData.date}
                        className="border p-2 text-center border-2 border-[#BEADFA]  cursor-pointer rounded-lg"
                        style={{
                          // backgroundColor: dateData.studyTimePercent > 50 ? "bg-green-400" : "bg-blue-400",
                          position: "relative",
                        }}
                        title={`${Math.floor(dateData.studyTime.hours)}hrs ${dateData.studyTime.minutes}mins`}
                      >
                        <div
                          className="absolute bottom-0 left-0 right-0"
                          style={{
                            height: fillHeight,
                            backgroundColor: "#BEADFA",
                          }}
                        />
                        <div className="relative z-10">{dateData.date}</div>
                      </div>
                    </>
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

export default renderCalendar;
