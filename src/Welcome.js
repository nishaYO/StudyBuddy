import React, { useState } from 'react';

function Welcome(props) {
    const [name, setName] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        props.onNameSubmit(name);
    };

    return (
        <div>
            <h1>Welcome to Study Buddy!</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Please enter your name:
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </label>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default Welcome;
