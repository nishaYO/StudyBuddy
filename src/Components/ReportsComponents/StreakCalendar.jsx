import React from "react";
import RenderCalendar from "./RenderCalendar";

const StreakCalendar = () => {
  return (
    <div className="flex flex-col items-center gap-7 m-10">
      <div className="text-4xl font-bold text-center">Streak Calendar</div>
      <div className="flex flex-row items-center gap-9">
        <RenderCalendar />
      </div>
    </div>
  );
};

export default StreakCalendar;
