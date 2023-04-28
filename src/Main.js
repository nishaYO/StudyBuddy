// Main.js
import React, { useState, useEffect } from 'react';
import './stylesheets/Main.css';
import SetTimer from './SetTimer';

function Main(props) {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [streak, setStreak] = useState(0);
    const [showSetTimer, setShowSetTimer] = useState(false);

    // calculate the current time zone offset and convert it to hours
    const timeZoneOffset = currentTime.getTimezoneOffset() / 60;
    const currentHour = currentTime.getHours() + timeZoneOffset;

    // set the greeting message based on the current hour
    let greetingMessage;
    if (currentHour >= 5 && currentHour < 12) {
        greetingMessage = 'Good Morning';
    } else if (currentHour >= 12 && currentHour < 18) {
        greetingMessage = 'Good Afternoon';
    } else {
        greetingMessage = 'Good Evening';
    }

    useEffect(() => {
        // update the current time every minute
        const interval = setInterval(() => {
            setCurrentTime(new Date());
        }, 60000);

        return () => clearInterval(interval);
    }, []);

    const handleStartSessionClick = () => {
        setShowSetTimer(true);
    };

    const handleTimerSubmit = () => {
        setShowSetTimer(false);
        // add your code to handle starting the session here
    };

    return (
        <div id="main-container">
            <div id="streak-container">
                <p id="streak-text">Streak: {props.streak}</p>
            </div>
            {showSetTimer ? (
                <SetTimer onSubmit={handleTimerSubmit} />
            ) : (
                <div id="greeting-container">
                    <p id="greeting-text">{greetingMessage}, {props.name}!</p>
                    <button id="start-session-button" onClick={handleStartSessionClick}>Start a Session</button>
                </div>
            )}
        </div>
    );
}

export default Main;