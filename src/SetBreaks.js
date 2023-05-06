import React from 'react';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import './stylesheets/SetBreaks.css';
import { FaTrashAlt } from 'react-icons/fa';
import { FaPlus } from 'react-icons/fa';

const SetBreaks = ({ totalDuration }) => {

    console.log(totalDuration);

    const navigate = useNavigate();

    const handlePrevClick = () => {
        navigate('/set-timer');
    };

    const handleNextClick = () => {
        navigate('/set-music');
    };

    const [breaks, setBreaks] = useState([{ duration: '', time: '', after: '' }]);

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

    return (
        <div id='set-breaks'>
            <h1>Set The Breaks</h1>
            <div id='add-breaks-box'>
                <div id='add-breaks'>
                    {breaks.map((breakItem, index) => (
                        <div key={index} className="break-item">
                            <input
                                type="number"
                                // placeholder="Duration (minutes)"
                                value={breakItem.duration}
                                onChange={(event) => handleBreakChange(event, index, 'duration')}
                            /> minutes break at <input
                                type="text"
                                // placeholder="Time (hh:mm)"
                                value={breakItem.time}
                                onChange={(event) => handleBreakChange(event, index, 'time')}
                            /> after <input
                                type="number"
                                // placeholder="After (hours)"
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
                </div>

            </div>
            <div id='nav-buttons'>
                <button className="navigation-button" id='prevbtn' onClick={handlePrevClick}>Go back</button>
                <button className="navigation-button" id='nextbtn' onClick={handleNextClick}>Continue</button>
            </div>
        </div>
    );
}

export default SetBreaks;
