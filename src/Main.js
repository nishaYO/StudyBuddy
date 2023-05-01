import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import './stylesheets/Main.css';
import Start from './Start';
import SetTimer from './SetTimer';
import SetMusic from './SetMusic';
import SessionStarted from './SessionStarted';


function Main(props) {
    const [streak, setStreak] = useState(0);

    const [activeComponent, setActiveComponent] = useState('start');

    const handleStartSessionClick = () => {
        setActiveComponent('set-timer');
    };

    const handleSetTimerNext = () => {
        setActiveComponent('set-music');
    };

    const handleSetTimerPrev = () => {
        setActiveComponent('start');
    };

    const handleSetMusicPrev = () => {
        setActiveComponent('set-timer');
    };

    const navigate = useNavigate();
    const handleReportClick = () => {
        navigate('/see-reports');
    }
    let activeComponentJSX;
    switch (activeComponent) {
        case 'start':
            activeComponentJSX = <Start onStartSessionClick={handleStartSessionClick} />;
            break;
        case 'set-timer':
            activeComponentJSX = <SetTimer onNext={handleSetTimerNext} onPrev={handleSetTimerPrev} />;
            break;
        case 'set-music':
            activeComponentJSX = <SetMusic onPrev={handleSetMusicPrev} />;
            break;
        case 'session-started':
            activeComponentJSX = <SessionStarted />;
            break;
        default:
            activeComponentJSX = <Start onStartSessionClick={handleStartSessionClick} />;
    }

    return (
        <div id="main-container">
            <div id="streak-container">
                <p id="streak-text">Streak: {streak}</p>
            </div>
            <div id="main-box">
                {activeComponentJSX}
            </div>
            <div id='reportcontainer'>
                <button onClick={handleReportClick}>See Reports</button>
            </div>
        </div>
    );
}
export default Main;





