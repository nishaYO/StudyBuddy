import React, { useState } from "react";
import PopUp from "./PopUp";
import { setBreaks } from "../../../redux/breakslice";
import ConvertPixelToTime from "./ConvertPixelToTime";
import { useDispatch, useSelector } from "react-redux";

const CreateBreakDiv = ({
  index,
  top,
  breakDivHeight,
  gridWidth,
  onClick,
  popUpClose,
}) => {
  console.log("index: ", index);
  const [isPopupOpen, setIsPopupOpen] = useState(true);
  const dispatch = useDispatch();
  const breaks = useSelector((state) => state.breaks);

  const handlePopupClose = () => {
    setIsPopupOpen(false);
    popUpClose();
  };

  const breakDivWidth = gridWidth - gridWidth / 100;

  const handleBreakDivClick = (event) => {
    event.stopPropagation();
    setIsPopupOpen(true);
    onClick();
  };

  const updateBreak = (field, subField, value) => {
    // update the breakDivHeight in jsx : onhold
    // console.log(breakDivheight and breaks array)
    // Update the breaks array
    const updatedBreaks = [...breaks];
    updatedBreaks[index][field][subField] = value;
    dispatch(setBreaks(updatedBreaks));
    console.log("updated breaks executed....");
    console.log("Updated breaks array:", updatedBreaks);
    console.log("Updated breakDivHeight:", breakDivHeight);
  };

  const breakHeightNumeric = parseInt(breakDivHeight, 10); 
  const currentBreakDuration = ConvertPixelToTime({ totalMinutes: breakHeightNumeric });
  
  console.log("Break Div Height:", breakDivHeight);
  console.log("Current Break Duration:", currentBreakDuration);
  return (
    <div>
      <div
        style={{
          position: "absolute",
          top: top,
          width: `${breakDivWidth}px`,
          height: breakDivHeight,
          backgroundColor: "orange",
          marginLeft: `${gridWidth / 200}px`,
          cursor: "pointer",
          borderRadius: "4px",
          boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.3)",
        }}
        onMouseDown={handleBreakDivClick}
      ></div>
      {isPopupOpen && (
        <PopUp
          onClose={handlePopupClose}
          index={index}
          updateBreak={(field, subField, value) =>
            updateBreak(field, subField, value)
          }
          currentBreakDuration={currentBreakDuration}
        />
      )}
    </div>
  );
};

export default CreateBreakDiv;
