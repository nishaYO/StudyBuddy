import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import './stylesheets/Main.css';
import Start from './Start';

function Main(props) {
    const [streak, setStreak] = useState(0);

    const navigate = useNavigate();
    const handleReportClick = () => {
        navigate('/see-reports');
    }

    return (
        <div id="main-container">
            <div id="streak-container">
                <p id="streak-text">Streak: {streak}</p>
            </div>
            <div id="main-box">
                <Start />
            </div>
            <div id='reportcontainer'>
                <button onClick={handleReportClick}>See Reports</button>
            </div>
        </div>
    );
}
export default Main;





