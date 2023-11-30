import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setBreaks } from "../../redux/breakslice";
import { setSessionIntervals } from "./../../redux/sessionIntervals";
import CreateBreakDiv from "./SetBreaksComponents/CreateBreakDiv";
import ConvertPixelToTime from "./SetBreaksComponents/ConvertPixelToTime";
import ConvertTimeToPixel from "./SetBreaksComponents/ConvertTimeToPixel";

const SetBreaks = () => {
  const dispatch = useDispatch();
  const breaks = useSelector((state) => state.breaks);
  const sessionIntervals = useSelector((state) => state.sessionIntervals);
  const sessionDuration = useSelector((state) => state.sessionDuration);

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isAddingIntervals, setIsAddingIntervals] = useState(false);
  const defaultBreakDuration = 10;
  
  const handleGridClick = async (event) => {
    if (!isPopupOpen && !isAddingIntervals) {
      const rect = event.target.getBoundingClientRect();
      const y = Math.round(event.nativeEvent.clientY - rect.top);
      setIsAddingIntervals(true);
      await addBreak(y);
      await addSessionIntervals(y);
      setIsAddingIntervals(false);
    }
  };

  const addBreak = async (y) => {
    // add a break to breaks array
    const breakStartTime = ConvertPixelToTime({ totalMinutes: y });

    const newBreak = {
      breakDuration: {
        hours: "0",
        minutes: defaultBreakDuration,
        seconds: "0",
      },
      breakStartTime: {
        hours: breakStartTime.hours,
        minutes: breakStartTime.minutes,
        seconds: breakStartTime.seconds,
      },
    };
    await dispatch(setBreaks([...breaks, newBreak]));
  };
  // use promist instead of await twice above
  // add study duration considering the previously added session intervals for start of study time
  const addSessionIntervals = async (y) => {
    const studyDuration = ConvertPixelToTime({ totalMinutes: y - 1 });
    const studyInterval = {
      hours: studyDuration.hours,
      minutes: studyDuration.minutes,
      seconds: studyDuration.seconds,
      type: "study",
    };
    const breakInterval = {
      hours: "0",
      minutes: defaultBreakDuration.toString(),
      seconds: "0",
      type: "break",
    };

    const newSessionIntervals =
      y === 0
        ? [breakInterval]
        : [...sessionIntervals, studyInterval, breakInterval];

    await dispatch(setSessionIntervals(newSessionIntervals));
  };

  const handlePopupClose = () => {
    setIsPopupOpen(false);
  };

  const handleDivClick = () => {
    setIsPopupOpen(true);
  };

  const gridHeight = ConvertTimeToPixel({
    timeObject: sessionDuration,
  });

  const gridWidth = 500;
  return (
    <div>
      <h2>SetBreaks</h2>
      <div
        style={{
          backgroundColor: "lightblue",
          width: `${gridWidth}px`,
          height: gridHeight,
          margin: "auto",
          marginTop: "10vh",
          marginLeft: "10vw",
          position: "relative",
          left: 0,
          top: 0,
        }}
        onMouseDown={handleGridClick}
      >
        {breaks.map((breakItem, index) => (
          <CreateBreakDiv
            key={index}
            index={index}
            top={ConvertTimeToPixel({ timeObject: breakItem.breakStartTime })}
            breakDivHeight={ConvertTimeToPixel({
              timeObject: breakItem.breakDuration,
            })}
            gridWidth={gridWidth}
            onClick={handleDivClick}
            popUpClose={handlePopupClose}
          />
        ))}
      </div>
    </div>
  );
};

export default SetBreaks;
