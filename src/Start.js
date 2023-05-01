//this will have greet component and start button
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

const Start = (props) => {
    const navigate = useNavigate();
    const handleStartSessionClick = () => {
        // setShowSetTimer(true);
        props.onStartSessionClick();
    };
    return (
        <div id="greeting-container">
            <Greet />
            <button id="start-session-button" onClick={handleStartSessionClick}>Start a Session</button>
        </div>
    );
}

export default Start;


const Greet = () => {
    const [currentTime, setCurrentTime] = useState(new Date());
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
    // greetingMessage += props.name ? `, ${props.name}!` : '!'; // add name to greeting message if it exists

    useEffect(() => {
        // update the current time every minute
        const interval = setInterval(() => {
            setCurrentTime(new Date());
        }, 60000);

        return () => clearInterval(interval);
    }, []);


    return (
        <p id="greeting-text">{greetingMessage}</p>
    );
}