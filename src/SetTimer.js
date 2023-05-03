import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './stylesheets/SetTimer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons';



function SetTimer() {
    const navigate = useNavigate();

    const handlePrevClick = () => {
        navigate('/main');
    };

    const handleNextClick = () => {
        navigate('/set-music');
    };

    return (
        <div id="timer-container">
            <p id='heading'>Set The Session Duration</p>
            <TimeDialer />
            <div id='nav-buttons'>
                <button className="navigation-button" onClick={handlePrevClick}>Go back</button>
                <button className="navigation-button" onClick={handleNextClick}>Continue</button>
            </div>
        </div>
    );
}

export default SetTimer;

const TimeDialer = () => {
    const [hours, setHours] = useState(2);
    const [minutes, setMinutes] = useState(30);


    const handleHrsUp = () => {
        setHours(hours + 1);
    };

    const handleHrsDown = () => {
        setHours(hours - 1);
    };

    const handleMinsUp = () => {
        setMinutes(minutes + 1);
    };

    const handleMinsDown = () => {
        setMinutes(minutes - 1);
    };

    return (

        <div id='settime'>
            <div id="hours" className='display'>
                <button onClick={handleHrsUp}><FontAwesomeIcon icon={faAngleUp} /></button>
                <div id='hrs-display'>{hours}hrs</div>
                <button onClick={handleHrsDown}>
                    <FontAwesomeIcon icon={faAngleDown} />
                </button>
            </div>
            <div id="minutes" className='display'>
                <button onClick={handleMinsUp}>
                    <FontAwesomeIcon icon={faAngleUp} />
                </button>
                <div id='mins-display'>{minutes}mins</div>
                <button onClick={handleMinsDown}>
                    <FontAwesomeIcon icon={faAngleDown} />
                </button>
            </div>
        </div>
    );
}
