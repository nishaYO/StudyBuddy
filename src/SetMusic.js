import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import React from 'react';


const focusMusicList = [
    {
        id: 1,
        name: "Meditation",
        image: "https://via.placeholder.com/150x150",
    },
    {
        id: 2,
        name: "Nature Sounds",
        image: "https://via.placeholder.com/150x150",
    },
    {
        id: 3,
        name: "Calm Music",
        image: "https://via.placeholder.com/150x150",
    },
];

const SetMusic = () => {

    const navigate = useNavigate();
    const [selectedMusic, setSelectedMusic] = useState(null);

    const handleMusicSelect = (music) => {
        setSelectedMusic(music);
    };

    const handlePrevClick = () => {
        navigate('/set-timer');
    };

    const handleNextClick = () => {
        navigate('/session-started');
    };


    return (
        <div>
            <h2>Select Focus Music</h2>
            <div>
                {focusMusicList.map((music) => (
                    <div key={music.id} onClick={() => handleMusicSelect(music)}>
                        <img src={music.image} alt={music.name} />
                        <p>{music.name}</p>
                    </div>
                ))}
            </div>
            {selectedMusic && (
                <div>
                    <h3>You have selected:</h3>
                    <img src={selectedMusic.image} alt={selectedMusic.name} />
                    <p>{selectedMusic.name}</p>
                </div>
            )}
            <button onClick={handlePrevClick}>Previous</button>
            <button onClick={handleNextClick}>Next</button>
        </div>
    );
};

export default SetMusic;




