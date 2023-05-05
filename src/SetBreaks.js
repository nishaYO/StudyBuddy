import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import React from 'react';
import './stylesheets/SetBreaks.css';

const SetBreaks = () => {
    const navigate = useNavigate();

    const handlePrevClick = () => {
        navigate('/set-timer');
    };

    const handleNextClick = () => {
        navigate('/set-music');
    };
    return (
        <div id='set-breaks'>
            Hello there i am a nice break page.
            <div id='nav-buttons'>
                <button className="navigation-button" onClick={handlePrevClick}>Go back</button>
                <button className="navigation-button" onClick={handleNextClick}>Continue</button>
            </div>
        </div>
    );
}

export default SetBreaks;
