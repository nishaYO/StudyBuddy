import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SetTimer() {
    const navigate = useNavigate();
    const [studyTime, setStudyTime] = useState(0);
    const [breakTime, setBreakTime] = useState(0);

    const handleStudyTimeChange = (event) => {
        setStudyTime(event.target.value);
    };

    const handleBreakTimeChange = (event) => {
        setBreakTime(event.target.value);
    };

    const handlePrevClick = () => {
        navigate('/main');
    };

    const handleNextClick = () => {
        navigate('/set-music');
    };

    return (
        <div>
            <label>Study Session Duration (in minutes):
                <input type="number" name="studyDuration" min="1" max="120" />
            </label>

            <label>Break Duration (in minutes):
                <input type="number" name="breakDuration" min="1" max="30" />
            </label>

            <label>Number of Sessions:
                <input type="number" name="numSessions" min="1" max="10" />
            </label>

            <label>Frequency of Breaks:
                <select name="breakFrequency">
                    <option value="everyOther">Every Other Session</option>
                    <option value="everyThree">Every Three Sessions</option>
                    <option value="everyFour">Every Four Sessions</option>
                </select>
            </label>

            <button onClick={handlePrevClick}>Previous</button>
            <button onClick={handleNextClick}>Next</button>
        </div>
    );
}

export default SetTimer;




