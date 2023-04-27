import React, { useState } from 'react';
import './Welcome.css';

function Welcome(props) {
    const [name, setName] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        localStorage.setItem('name', name);
        props.onNameSubmit(name);

        try {
            const response = await fetch('https://example.com/api/saveName', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: name }),
            });
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div id="welcome-container">
            <h1 id="welcome-header">Welcome to Study Buddy!</h1>
            <form id="name-form" onSubmit={handleSubmit}>
                <label htmlFor="name-input" id="name-label">
                    What should I call you?
                    <input type="text" id="name-input" value={name} onChange={(e) => setName(e.target.value)} />
                </label>
                <button type="submit" id="name-submit-button">Enter</button>
            </form>
        </div>
    );
}

export default Welcome;
