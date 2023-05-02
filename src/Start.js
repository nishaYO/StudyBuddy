import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

const Start = () => {
    const navigate = useNavigate();
    const handleStartSessionClick = () => {
        navigate('/set-timer');
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

    const [now, setNow] = useState(new Date());
    const currentHour = now.getHours();

    // set the greeting message based on the current hour
    let greetingMessage;
    if (currentHour >= 5 && currentHour < 12) {
        greetingMessage = 'Good Morning';
    } else if (currentHour >= 12 && currentHour < 18) {
        greetingMessage = 'Good Afternoon';
    } else {
        greetingMessage = 'Good Evening';
    }


    greetingMessage += localStorage.name ? `, ${localStorage.name}!` : '!'; // add name to greeting message if it exists

    useEffect(() => {
        // update the current time every minute
        const interval = setInterval(() => {
            setNow(new Date());
        }, 60000);

        return () => clearInterval(interval);
    }, []);


    return (
        <p id="greeting-text">{greetingMessage}</p>
    );
}