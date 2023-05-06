
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './stylesheets/SetTimer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons';

function SetTimer({ totalDurationProp }) {

    // executed whenever rendered (after refresh or navigation)
    const [hours, setHours] = useState(parseInt(sessionStorage.getItem('hours')) || 2);
    const [minutes, setMinutes] = useState(parseInt(sessionStorage.getItem('minutes')) || 30);
    const navigate = useNavigate();

    // endTime = currentTime + currentlySet hours and minutes 
    const [endTime, setEndTime] = useState("");

    // function to format time as HH:MM
    const formatTime = (date) => {
        const hours = date.getHours().toString().padStart(2, "0");
        const minutes = date.getMinutes().toString().padStart(2, "0");
        return `${hours}:${minutes}`;
    }

    // update endTime whenever hours or minutes changes
    useEffect(() => {
        const currentTime = new Date();
        // this setHours and setMinutes are methods of Date object different from the ones used earlier
        currentTime.setHours(currentTime.getHours() + hours);
        currentTime.setMinutes(currentTime.getMinutes() + minutes);
        setEndTime(formatTime(currentTime));
    }, [hours, minutes]);

    // executed whenever hours or minutes value is changed
    useEffect(() => {
        sessionStorage.setItem('hours', hours);
        sessionStorage.setItem('minutes', minutes);
        totalDurationProp(`${hours}:${minutes}`);
    }, [hours, minutes]);

    const handlePrevClick = () => {
        navigate('/main');
    };

    const handleNextClick = () => {
        // hours and minutes can't be zero simultaneously when clicked on continue
        if (hours === 0 && minutes === 0) {
            alert("Timer cannot be set for 0 hours 0 minutes!");
        } else {
            navigate('/set-breaks');
        }
    };

    return (
        <div id="timer-container">
            <p id='heading'>Set The Session Duration</p>
            <TimeDialer hours={hours} setHours={setHours} minutes={minutes} setMinutes={setMinutes} />
            <div id='session-end'>
                The session ends at {endTime}
            </div>
            <div id='nav-buttons'>
                <button className="navigation-button" onClick={handlePrevClick}>Go back</button>
                <button className="navigation-button" onClick={handleNextClick}>Continue</button>
            </div>
        </div>
    );
}

const TimeDialer = ({ hours, setHours, minutes, setMinutes }) => {

    const handleHrsUp = () => {
        setHours(hours < 23 ? hours + 1 : 0);
    };

    const handleHrsDown = () => {
        // hours between zero to 23
        if (hours > 0) {
            setHours(hours - 1);
        } else {
            setHours(23);
        }
    };

    const handleMinsUp = () => {
        setMinutes(minutes < 59 ? minutes + 1 : 0);
    };

    const handleMinsDown = () => {
        // minutes between zero to 59
        if (minutes > 0) {
            setMinutes(minutes - 1);
        } else {
            setMinutes(59);
        }
    };

    return (
        <div id='settime'>
            <div id="hours" className='display'>
                hrs
                <button onClick={handleHrsUp}><FontAwesomeIcon icon={faAngleUp} /></button>
                <input id='hrs-display' type='number' value={hours.toString().padStart(2, "0")} onChange={(e) => setHours(parseInt(e.target.value))} />

                <button onClick={handleHrsDown}>
                    <FontAwesomeIcon icon={faAngleDown} />
                </button>
            </div>
            <div id="minutes" className='display'>
                mins
                <button onClick={handleMinsUp}>
                    <FontAwesomeIcon icon={faAngleUp} />
                </button>
                <input id='mins-display' type='number' value={minutes.toString().padStart(2, "0")} onChange={(e) => setMinutes(parseInt(e.target.value))} />

                <button onClick={handleMinsDown}>
                    <FontAwesomeIcon icon={faAngleDown} />
                </button>
            </div>
        </div>
    );
};

export default SetTimer;

