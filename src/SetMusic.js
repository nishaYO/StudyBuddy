import { useNavigate } from 'react-router-dom';
import React from 'react';
import { useState } from 'react';
import './stylesheets/SetMusic.css';
import { FaVolumeUp } from 'react-icons/fa';
import { FaVolumeDown } from 'react-icons/fa';
import { FaVolumeMute } from 'react-icons/fa';
import { FaVolumeOff } from 'react-icons/fa';

const soundList = [
    {
        id: 1,
        name: "Meditation",
        image: "https://media.giphy.com/media/3o8dFlRx9QGDdfs3UQ/giphy.gif",
        audio: require('./soundsAndEffects/sounds/purrple-cat-crescent-moon.mp3'),
        volume: 0.5
    },
    {
        id: 2,
        name: "Nature Sounds",
        image: "https://media.giphy.com/media/n9h61thJkq6Xe/giphy.gif",
        audio: require('./soundsAndEffects/sounds/Ghostrifter-Official-Celestia.mp3'),
        volume: 0.5
    },
    {
        id: 3,
        name: "Calm Music",
        image: "https://media.giphy.com/media/q10hztkXiFFmhBbH2l/giphy.gif",
        audio: require('./soundsAndEffects/sounds/Lost-and-Found.mp3'),
        volume: 0.5
    },
];

const effectList = [
    {
        id: 1,
        name: "Rain",
        image: "https://media.giphy.com/media/1fnu914Z79qQpVi2xZ/giphy.gif",
        audio: require('./soundsAndEffects/effects/effect_rain.mp3'),
        volume: 0.5
    },
    {
        id: 2,
        name: "Fire",
        image: "https://media.giphy.com/media/rkSu72ptAZseQ/giphy.gif",
        audio: require('./soundsAndEffects/effects/effect_fire.mp3'),
        volume: 0.5
    },
    {
        id: 3,
        name: "Forest",
        image: "https://media.giphy.com/media/VFqafDSTxP0ic/giphy.gif",
        audio: require('./soundsAndEffects/effects/effect_forest.mp3'),
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
            {/* <FaVolumeUp size={20} />
            <FaVolumeOff size={20} />
            <FaVolumeMute size={20} />
            <FaVolumeDown size={20} /> */}
            <div id="music-form">
                <div className="sounds flex-container-column">
                    <header className='flex-container-row'>
                        <h2>Sounds</h2>
                        <FaVolumeUp size={20} />
                    </header>
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
                    <header className='flex-container-row'>
                        <h2>Effects</h2>
                        <FaVolumeUp size={20} />
                    </header>

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
            {selectedMusic && (
                <div>
                    <h2>Selected Music {selectedMusic.name}</h2>
                    <audio src={selectedMusic.audio.default} autoPlay loop volume={selectedMusic.volume} mute={false} />
                </div>
            )}

            <button id="prevbtn" className="navigation-button" onClick={handlePrevClick}>Previous</button>
            <button id="nextbtn" className="navigation-button" onClick={handleNextClick}>Next</button>

        </div>
    );
};

export default SetMusic;



