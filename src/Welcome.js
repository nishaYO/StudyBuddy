
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import './stylesheets/Welcome.css';

function Welcome(props) {
    const [name, setName] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        localStorage.setItem('name', name);
        navigate('/main');
    };

    return (
        <div id="welcome-container">
            <h1 id="welcome-header">Welcome to Study Buddy!</h1>
            <form id="name-form">
                <label htmlFor="name-input" id="name-label">
                    What should I call you?
                    <input type="text" id="name-input" value={name} onChange={(e) => {
                        setName(e.target.value);
                    }} />
                </label>

                <button type="submit" id="name-submit-button" onClick={handleSubmit}>Enter</button>

            </form>
        </div>
    );
}

export default Welcome;





