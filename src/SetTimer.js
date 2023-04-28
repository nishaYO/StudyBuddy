import React, { useState } from 'react';

function SetTimer(props) {
    const [studyTime, setStudyTime] = useState(0);
    const [breakTime, setBreakTime] = useState(0);

    const handleStudyTimeChange = (event) => {
        setStudyTime(event.target.value);
    };

    const handleBreakTimeChange = (event) => {
        setBreakTime(event.target.value);
    };

    return (
        <div>
            <h2>Timer</h2>
            <p>Hello, {props.name}! Please set the study time and break time:</p>
            <div>
                <label>Study time:</label>
                <input type="number" value={studyTime} onChange={handleStudyTimeChange} />
            </div>
            <div>
                <label>Break time:</label>
                <input type="number" value={breakTime} onChange={handleBreakTimeChange} />
            </div>
        </div>
    );
}

export default SetTimer;
