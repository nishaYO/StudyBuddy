import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './stylesheets/SetTimer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons';

function SetTimer() {
    const [hours, setHours] = useState(2);
    const [minutes, setMinutes] = useState(30);
    const navigate = useNavigate();

    const handlePrevClick = () => {
        navigate('/main');
    };

    const handleNextClick = () => {
        // hours and minutes can't be zero simultaneously when clicked on continue
        if (hours === 0 && minutes === 0) {
            alert("Timer cannot be set for 0 hours 0 minutes!");
        } else {
            navigate('/set-music');
        }
    };

    return (
        <div id="timer-container">
            <p id='heading'>Set The Session Duration</p>
            <TimeDialer hours={hours} setHours={setHours} minutes={minutes} setMinutes={setMinutes} />
            <div id='nav-buttons'>
                <button className="navigation-button" onClick={handlePrevClick}>Go back</button>
                <button className="navigation-button" onClick={handleNextClick}>Continue</button>
            </div>
        </div>
    );
}

const TimeDialer = ({ hours, setHours, minutes, setMinutes }) => {

    const handleHrsUp = () => {
        setHours(hours + 1);
    };

    const handleHrsDown = () => {
        // hours can't be in negative
        if (hours > 0) {
            setHours(hours - 1);
        }
    };

    const handleMinsUp = () => {
        setMinutes(minutes + 1);
    };

    const handleMinsDown = () => {
        // minutes can't be in negative
        if (minutes > 0) {
            setMinutes(minutes - 1);
        }
    };

    return (
        <div id='settime'>
            <div id="hours" className='display'>
                <button onClick={handleHrsUp}><FontAwesomeIcon icon={faAngleUp} /></button>
                <input id='hrs-display' type='number' value={hours} onChange={(e) => setHours(e.target.value)} />
                <button onClick={handleHrsDown}>
                    <FontAwesomeIcon icon={faAngleDown} />
                </button>
            </div>
            <div id="minutes" className='display'>
                <button onClick={handleMinsUp}>
                    <FontAwesomeIcon icon={faAngleUp} />
                </button>
                <input id='mins-display' type='number' value={minutes} onChange={(e) => setMinutes(e.target.value)} />
                <button onClick={handleMinsDown}>
                    <FontAwesomeIcon icon={faAngleDown} />
                </button>
            </div>
        </div>
    );
};

export default SetTimer;

