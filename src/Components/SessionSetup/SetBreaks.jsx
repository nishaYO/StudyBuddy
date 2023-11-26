import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faPlus } from "@fortawesome/free-solid-svg-icons";
import { setBreaks } from "../../redux/breakslice";
import { useDispatch, useSelector } from "react-redux";
import CalculateGridHeight from "./SetBreaksComponents/CalculateGridHeight";
import CreateBreakDiv from "./SetBreaksComponents/CreateBreakDiv";
import ConvertPixelToTime from "./SetBreaksComponents/ConvertPixelToTime";
import PopUp from "./SetBreaksComponents/PopUp";

const SetBreaks = () => {
  const dispatch = useDispatch();
  const breaks = useSelector((state) => state.breaks);
  const [breakDivs, setBreakDivs] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleGridClick = (event) => {
    if (!isPopupOpen) {
      const rect = event.target.getBoundingClientRect();
      const y = Math.round(event.nativeEvent.clientY - rect.top);
      addBreak(y);
    }
  };

  const addBreak = (y) => {
    // add a break to breaks array
    const breakStartTime = ConvertPixelToTime({ totalMinutes: y });
    const defaultBreakDuration = 15;
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
    dispatch(setBreaks([...breaks, newBreak]));
    // create a breakDiv and add it to the breakDivs array to show in the grid
    addBreakDiv(y, defaultBreakDuration);
  };

  const addBreakDiv = (y, duration) => {
    const newBreakDivs = [...breakDivs, { y, duration }];
    setBreakDivs(newBreakDivs);
  };

  const handlePopupClose = () => {
    setIsPopupOpen(false);
  };

  const handleDivClick = () => {
    setIsPopupOpen(true);
  };

  const gridHeight = CalculateGridHeight();
  const gridWidth = 500;
  return (
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
      {breakDivs.map((breakDiv, index) => (
        <CreateBreakDiv
          key={index}
          top={breakDiv.y}
          breakDivHeight={breakDiv.duration}
          gridWidth={gridWidth}
          onClick={handleDivClick}
        />
      ))}
      {isPopupOpen && <PopUp onClose={handlePopupClose} />}
    </div>
  );
};

export default SetBreaks;
