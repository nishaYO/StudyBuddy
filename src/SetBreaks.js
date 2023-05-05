import React from 'react';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import './stylesheets/SetBreaks.css';
import { FaTrashAlt } from 'react-icons/fa';
import { FaPlus } from 'react-icons/fa';

const SetBreaks = () => {
    const navigate = useNavigate();

    const handlePrevClick = () => {
        navigate('/set-timer');
    };

    const handleNextClick = () => {
        navigate('/set-music');
    };

    const [breaks, setBreaks] = useState([{ duration: '', time: '', after: '' }]);
    const [totalDuration, setTotalDuration] = useState(0);

    const addBreak = () => {
        setBreaks([...breaks, { duration: '', time: '', after: '' }]);
    };

    const removeBreak = (index) => {
        const newBreaks = [...breaks];
        newBreaks.splice(index, 1);
        setBreaks(newBreaks);
    };

    const handleBreakChange = (event, index, field) => {
        const newBreaks = [...breaks];
        newBreaks[index][field] = event.target.value;
        setBreaks(newBreaks);
    };

    const calculateTotalDuration = () => {
        let total = 0;
        breaks.forEach((breakItem) => {
            if (breakItem.duration && breakItem.after && breakItem.time) {
                const durationInMinutes = parseInt(breakItem.duration);
                const afterInHours = parseInt(breakItem.after);
                const [timeHours, timeMinutes] = breakItem.time.split(':').map((value) => parseInt(value));
                const startTimeInMinutes = timeHours * 60 + timeMinutes;
                const breakStartTimeInMinutes = startTimeInMinutes + afterInHours * 60;
                const breakEndTimeInMinutes = breakStartTimeInMinutes + durationInMinutes;
                total += breakEndTimeInMinutes - startTimeInMinutes;
            }
        });
        setTotalDuration(total);
    };

    return (
        <div id='set-breaks'>
            <h1>Set The Breaks</h1>
            <div id='add-breaks-box'>
                <div id='add-breaks'>
                    {breaks.map((breakItem, index) => (
                        <div key={index}>
                            <input
                                type="number"
                                placeholder="Duration (minutes)"
                                value={breakItem.duration}
                                onChange={(event) => handleBreakChange(event, index, 'duration')}
                            /> minutes break at <input
                                type="text"
                                placeholder="Time (hh:mm)"
                                value={breakItem.time}
                                onChange={(event) => handleBreakChange(event, index, 'time')}
                            /> after <input
                                type="number"
                                placeholder="After (hours)"
                                value={breakItem.after}
                                onChange={(event) => handleBreakChange(event, index, 'after')}
                            />hour{breakItem.after > 1 ? 's' : ''} into session.
                            <button id="delbtn" onClick={() => removeBreak(index)}>
                                <FaTrashAlt size={20} />
                            </button>
                        </div>

                    ))}
                    <button id='addbtn' onClick={addBreak}>
                        <FaPlus size={25} />
                    </button>
                    {/* <button onClick={calculateTotalDuration}>Calculate Total Duration</button>
                <div>Total Break Duration: {totalDuration} minutes</div> */}
                </div>

            </div>
            <div id='nav-buttons'>
                <button className="navigation-button" onClick={handlePrevClick}>Go back</button>
                <button className="navigation-button" onClick={handleNextClick}>Continue</button>
            </div>
        </div>
    );
}

export default SetBreaks;
