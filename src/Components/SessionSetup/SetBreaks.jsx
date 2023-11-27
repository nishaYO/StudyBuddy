import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faPlus } from "@fortawesome/free-solid-svg-icons";
import { setBreaks } from "../../redux/breakslice";
import { useDispatch, useSelector } from "react-redux";
import CreateBreakDiv from "./SetBreaksComponents/CreateBreakDiv";
import ConvertPixelToTime from "./SetBreaksComponents/ConvertPixelToTime";
import ConvertTimeToPixel from "./SetBreaksComponents/ConvertTimeToPixel";

const SetBreaks = () => {
  const dispatch = useDispatch();
  const breaks = useSelector((state) => state.breaks);
  const sessionDuration = useSelector((state) => state.sessionDuration);
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
  };

  const handlePopupClose = () => {
    setIsPopupOpen(false);
  };

  const handleDivClick = () => {
    setIsPopupOpen(true);
  };

  const gridHeight = ConvertTimeToPixel({timeObject:{hours: '3', minutes: '30', seconds: '0'}});

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
    >{
      breaks.map((breakItem, index) => (
        <CreateBreakDiv
          key={index}
          index={index}
          top={ConvertTimeToPixel({timeObject: breakItem.breakStartTime})}
          breakDivHeight={ConvertTimeToPixel({timeObject: breakItem.breakDuration})}
          gridWidth={gridWidth}
          onClick={handleDivClick}
          popUpClose={handlePopupClose}
        />
      ))
    }
    
    
    </div>
  );
};

export default SetBreaks;
