import { useNavigate } from 'react-router-dom';
import React from 'react';
import { useState } from 'react';
import './stylesheets/SetMusic.css';

const soundList = [
    {
        id: 1,
        name: "Meditation",
        image: "https://media.giphy.com/media/3o8dFlRx9QGDdfs3UQ/giphy.gif",
        audio: './sounds-and-effects/sounds/purrple-cat-crescent-moon.mp3',
        volume: 0.5
    },
    {
        id: 2,
        name: "Nature Sounds",
        image: "https://media.giphy.com/media/n9h61thJkq6Xe/giphy.gif",
        audio: './sounds-and-effects/sounds/Ghostrifter-Official-Celestia.mp3',
        volume: 0.5
    },
    {
        id: 3,
        name: "Calm Music",
        image: "https://media.giphy.com/media/q10hztkXiFFmhBbH2l/giphy.gif",
        audio: './sounds-and-effects/sounds/Lost-and-Found.mp3',
        volume: 0.5
    },
];

const effectList = [
    {
        id: 1,
        name: "Rain",
        image: "https://media.giphy.com/media/1fnu914Z79qQpVi2xZ/giphy.gif",
        audio: "soundsAndEffects\effects\effect_rain.mp3",
        volume: 0.5
    },
    {
        id: 2,
        name: "Fire",
        image: "https://media.giphy.com/media/rkSu72ptAZseQ/giphy.gif",
        audio: "soundsAndEffects\effects\effect_fire.mp3",
        volume: 0.5
    },
    {
        id: 3,
        name: "Forest",
        image: "https://media.giphy.com/media/VFqafDSTxP0ic/giphy.gif",
        audio: "soundsAndEffects\effects\effect_forest.mp3",
        volume: 0.5
    },
];

const SetMusic = () => {
    const navigate = useNavigate();
    const [selectedMusic, setSelectedMusic] = useState(null);
    const [isMuted, setIsMuted] = useState(false);

    const handleMusicSelect = (music) => {
        setSelectedMusic(music);
    };

    const handlePrevClick = () => {
        navigate('/set-breaks');
    };

    const handleNextClick = () => {
        navigate('/session-started');
    };

    const handleVolumeClick = () => {
        setIsMuted(!isMuted);
    }

    return (
        <div id="music-container">
            <h1>Select Focus Music</h1>
            <div id="music-form">
                <div className="sounds flex-container-column">
                    <h2>Sounds</h2>
                    <div className="flex-container-row">
                        {soundList.map((music) => (
                            <div className="sound flex-container-column" key={music.id} onClick={() => handleMusicSelect(music)}>
                                <img width="150px" height="150px" src={music.image} alt={music.name} />
                                <p>{music.name}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="effects flex-container-column">
                    <h2>Effects</h2>
                    <div className="flex-container-row">
                        {effectList.map((music) => (
                            <div className="effect flex-container-column" key={music.id} onClick={() => handleMusicSelect(music)}>
                                <img width="150px" height="150px" src={music.image} alt={music.name} />
                                <p>{music.name}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {/* {selectedMusic && (
                <div>
                    <h2>Selected Music</h2>
                    <audio src={selectedMusic.audio} autoPlay loop volume={selectedMusic.volume} />
                </div>
            )} */}
            <button id="prevbtn" className="navigation-button" onClick={handlePrevClick}>Previous</button>
            <button id="nextbtn" className="navigation-button" onClick={handleNextClick}>Next</button>
            {/* <button id="volumebtn" className="navigation-button" onClick={handleVolumeClick}>
                {isMuted ? <i className="fas fa-volume-mute"></i> : <i className="fas fa-volume-up"></i>}
            </button> */}
        </div>
    );
};

export default SetMusic;



