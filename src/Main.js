import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import './stylesheets/Main.css';

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
    greetingMessage += props.name ? `, ${props.name}!` : '!'; // add name to greeting message if it exists

    useEffect(() => {
        // update the current time every minute
        const interval = setInterval(() => {
            setCurrentTime(new Date());
        }, 60000);

        return () => clearInterval(interval);
    }, []);

    const navigate = useNavigate();
    const handleStartSessionClick = () => {
        setShowSetTimer(true);
        navigate('/set-timer');
    };



    return (
        <div id="main-container">
            <div id="streak-container">
                <p id="streak-text">Streak: {props.streak}</p>
            </div>

            <div id="greeting-container">
                <p id="greeting-text">{greetingMessage}</p>
                <button id="start-session-button" onClick={handleStartSessionClick}>Start a Session</button>
            </div>

        </div>
    );
}
export default Main;





