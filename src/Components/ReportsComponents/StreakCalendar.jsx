import React from "react";
import MonthTemplate from "./MonthTemplate";
const StreakCalendar = () => {
  return (
    <div className="flex flex-col items-center gap-7 m-10">
      <div>StreakCalendar</div>
      <div className="flex flex-row items-center gap-9">
      <MonthTemplate />
      
      <MonthTemplate />
      </div>
    </div>
  );
};

export default StreakCalendar;
