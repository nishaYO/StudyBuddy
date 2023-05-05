import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import React from 'react';

const SetBreaks = () => {
    const navigate = useNavigate();

    const handlePrevClick = () => {
        navigate('/set-timer');
    };

    const handleNextClick = () => {
        navigate('/set-music');
    };
    return (
        <div>
            Hello there i am a nice break page.
            <button onClick={handlePrevClick}>Previous</button>
            <button onClick={handleNextClick}>Next</button>
        </div>
    );
}

export default SetBreaks;
