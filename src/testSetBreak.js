import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import './stylesheets/SetBreaks.css';
import { FaTrashAlt } from 'react-icons/fa';
import { FaPlus } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import './stylesheets/TestSetBreaks.css';
import './stylesheets/SetBreaks.css';

const TestSetBreaks = ({ totalDuration }) => {

    // Convert totalDuration from hh:mm format to total minutes
    const [totalMinutes, setTotalMinutes] = useState(0);
    useEffect(() => {
        const [hours, minutes] = totalDuration.split(":");
        setTotalMinutes(parseInt(hours) * 60 + parseInt(minutes));
    }, [totalDuration]);

    // const navigate = useNavigate();

    const handlePrevClick = () => {
        // navigate('/set-timer');
    };

    const handleNextClick = () => {
        // navigate('/set-music');
    };

    const [breaks, setBreaks] = useState([{ time: '', duration: { hours: 0, minutes: 0 } }]);

    const addBreak = () => {
        setBreaks([...breaks, { time: '', duration: { hours: 0, minutes: 0 } }]);
    };

    const removeBreak = (index) => {
        const newBreaks = [...breaks];
        newBreaks.splice(index, 1); // 1 shows the number of elements to be deleted starting from the given index
        setBreaks(newBreaks);
    };

    const handleBreakChange = (event, index, field, type) => {
        const newBreaks = [...breaks];

        if (field === "duration" && type === "hours") {
            const duration = { ...newBreaks[index].duration, hours: parseInt(event.target.value) };
            if ((duration.hours * 60 + duration.minutes) > totalMinutes) {
                alert('Break duration cannot be longer than total study duration');
                return;
            }
            newBreaks[index][field] = duration;
        } else if (field === "duration" && type === "minutes") {
            const duration = { ...newBreaks[index].duration, minutes: parseInt(event.target.value) };
            if ((duration.hours * 60 + duration.minutes) > totalMinutes) {
                alert('Break duration cannot be longer than total study duration');
                return;
            }
            newBreaks[index][field] = duration;
        } else {
            newBreaks[index][field] = event.target.value;
        }

        // Check for overlapping breaks
        for (let i = 0; i < newBreaks.length; i++) {
            if (i === index) continue;
            const t1 = newBreaks[i].time.split(":");
            const t2 = newBreaks[index].time.split(":");
            const time1 = parseInt(t1[0]) * 60 + parseInt(t1[1]);
            const time2 = parseInt(t2[0]) * 60 + parseInt(t2[1]);
            const duration1 = newBreaks[i].duration.hours * 60 + newBreaks[i].duration.minutes;
            const duration2 = newBreaks[index].duration.hours * 60 + newBreaks[index].duration.minutes;
            if (time1 <= time2 && (time1 + duration1) > time2) {
                alert("Breaks should not overlap");
                return;
            } else if (time1 >= time2 && (time2 + duration2) > time1) {
                alert("Breaks should not overlap");
                return;
            }
        }

        setBreaks(newBreaks);
    };

    return (
        <div className="set-breaks-container">
            <h1>Set Breaks</h1>
            <div id='session-end'>
                Total Study Duration: {totalDuration}
            </div>
            <div className="breaks-form" id='add-breaks-box'>
                <div id='add-breaks'>
                    {breaks.map((breakObj, index) => (
                        <div key={index} className="break-item">
                            <div className="input-field">
                                <p>Time</p>
                                <div className="input-box">
                                    <div className="arrow-btns">
                                        <button className="arrow-btn">
                                            <FontAwesomeIcon icon={faAngleUp} />
                                        </button>
                                        <button className="arrow-btn">
                                            <FontAwesomeIcon icon={faAngleUp} />
                                        </button>
                                    </div>


                                    <input
                                        type="time"
                                        value={breakObj.time}
                                        onChange={(event) => handleBreakChange(event, index, "time")}
                                        className="break-time-input"
                                    />
                                    <div className="arrow-btns">
                                        <button className="arrow-btn">
                                            <FontAwesomeIcon icon={faAngleDown} />
                                        </button>
                                        <button className="arrow-btn">
                                            <FontAwesomeIcon icon={faAngleDown} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="input-field">
                                <p>Duration</p>
                                <div className="input-box">
                                    <div className="arrow-btns">
                                        <button className="arrow-btn">
                                            <FontAwesomeIcon icon={faAngleUp} />
                                        </button>
                                        <button className="arrow-btn">
                                            <FontAwesomeIcon icon={faAngleUp} />
                                        </button>
                                    </div>
                                    <div className="input-duration">
                                        <input
                                            type="number"
                                            min="0"
                                            max="99"
                                            value={breakObj.duration.hours}
                                            onChange={(event) => handleBreakChange(event, index, "duration", "hours")}
                                            className="break-duration-hours"
                                        />
                                        :
                                        <input
                                            type="number"
                                            min="0"
                                            max="59"
                                            value={breakObj.duration.minutes}
                                            onChange={(event) => handleBreakChange(event, index, "duration", "minutes")}
                                            className="break-duration-minutes"
                                        />
                                    </div>
                                    <div className="arrow-btns">
                                        <button className="arrow-btn">
                                            <FontAwesomeIcon icon={faAngleDown} />
                                        </button>
                                        <button className="arrow-btn">
                                            <FontAwesomeIcon icon={faAngleDown} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <button
                                id="delbtn"
                                onClick={() => removeBreak(index)}
                            >
                                <FaTrashAlt />
                            </button>
                        </div>
                    ))}
                    <button id="addbtn" onClick={addBreak}>
                        <FaPlus />
                    </button>
                </div></div>
            <div className="buttons">
                <button className="navigation-button" id="prevbtn" onClick={handlePrevClick}>
                    Go Back
                </button>
                <button className="navigation-button" id="nextbtn" onClick={handleNextClick}>
                    Continue
                </button>
            </div>
        </div >
    );
}

export default TestSetBreaks;
