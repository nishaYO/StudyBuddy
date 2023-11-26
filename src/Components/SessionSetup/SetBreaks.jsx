import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faPlus } from "@fortawesome/free-solid-svg-icons";
import { setBreaks } from "../../redux/breakslice";
import { useDispatch, useSelector } from "react-redux";
import CalculateGridHeight from "./SetBreaks/CalculateGridHeight";
import CreateBreakDiv from "./SetBreaks/CreateBreakDiv";

// grid and timeline and current timeline, grid click handle
// create break divs , div click handle
// popup page, onchange in inputs

const SetBreaks = () => {
  const dispatch = useDispatch();
  const breaks = useSelector((state) => state.breaks);
  const [breakDivs, setBreakDivs] = useState([]);

  const handleMouseDown = (event) => {
    const rect = event.target.getBoundingClientRect();
    const y = Math.round(event.nativeEvent.clientY - rect.top);
    const newBreakDivs = [...breakDivs, { y }];
    setBreakDivs(newBreakDivs);
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
      onMouseDown={handleMouseDown}
    >
      {breakDivs.map((breakDiv, index) => (
        <CreateBreakDiv key={index} top={breakDiv.y} gridWidth={gridWidth}/>
      ))}
    </div>
  );
};

export default SetBreaks;
