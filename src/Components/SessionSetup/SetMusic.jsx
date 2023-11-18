import { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPause,
  faVolumeMute,
  faVolumeHigh,
  faVolumeLow,
  faVolumeUp,
} from "@fortawesome/free-solid-svg-icons";

const soundList = [
  {
    id: 1,
    name: "Meditation",
    image: "https://media.giphy.com/media/8pO7dRS7JRxigBSLKF/giphy.gif",
    audio: "./soundsAndEffects/sounds/purrple-cat-crescent-moon.mp3",
    volume: 0.5,
  },
  {
    id: 2,
    name: "Nature Sounds",
    image: "https://media.giphy.com/media/Yg12tqyJwylsk/giphy.gif",
    audio: "./soundsAndEffects/sounds/Ghostrifter-Official-Celestia.mp3",
    volume: 0.5,
  },
  {
    id: 3,
    name: "Calm Music",
    image: "https://media.giphy.com/media/q10hztkXiFFmhBbH2l/giphy.gif",
    audio: "./soundsAndEffects/sounds/Lost-and-Found.mp3",
    volume: 0.5,
  },
  {
    id: 4,
    name: "Drum",
    image: "https://media.giphy.com/media/1w3KfcZeu8d0GsC89V/giphy.gif",
    audio: "./soundsAndEffects/sounds/drum.mp3",
    volume: 0.5,
  },
  {
    id: 5,
    name: "Seeking Peace",
    image: "https://media.giphy.com/media/dNgK7Ws7y176U/giphy.gif",
    audio: "./soundsAndEffects/sounds/seeking peace.mp3",
    volume: 0.5,
  },
  {
    id: 6,
    name: "Otjanbird",
    image: "https://media.giphy.com/media/l0IyirIYBWR4CwJWw/giphy.gif",
    audio: "./soundsAndEffects/sounds/track_Otjanbird-Pt.-II.mp3",
    volume: 0.5,
  },
];

const effectList = [
  {
    id: 7,
    name: "Rain",
    image: "https://media.giphy.com/media/PbOaO2fedzQLm/giphy.gif",
    audio: "./soundsAndEffects/effects/effect_rain.mp3",
    volume: 0.5,
  },
  {
    id: 8,
    name: "Fire",
    image: "https://media.giphy.com/media/mukI8MtW2BHhjj4INb/giphy.gif",
    audio: "./soundsAndEffects/effects/effect_fire.mp3",
    volume: 0.5,
  },
  {
    id: 9,
    name: "River",
    image: "https://media.giphy.com/media/93lPhTvisYUenR7Uhb/giphy.gif",
    audio: "./soundsAndEffects/effects/effect_river.mp3",
    volume: 0.5,
  },
  {
    id: 10,
    name: "Nightfall",
    image: "https://media.giphy.com/media/PUZY5bpax4yVpqfufb/giphy.gif",
    audio: "./soundsAndEffects/effects/effect_nightFall.mp3",
    volume: 0.5,
  },
  {
    id: 11,
    name: "Forest",
    image: "https://media.giphy.com/media/KHh7jLrG6gIXBTnxsp/giphy.gif",
    audio: "./soundsAndEffects/effects/effect_forest.mp3",
    volume: 0.5,
  },
  {
    id: 12,
    name: "Waves",
    image: "https://media.giphy.com/media/xT0GqcCJJJH12hJvGM/giphy.gif",
    audio: "./soundsAndEffects/effects/effect_wavesHittingRocks.mp3",
    volume: 0.5,
  },
];

function SetMusic() {
  const [playingState, setPlayingState] = useState({});
  const [volumeState, setVolumeState] = useState(100);
  const [hoveredSoundIndex, setHoveredSoundIndex] = useState(null);
  const [hoveredEffectIndex, setHoveredEffectIndex] = useState(null);
  const [MusicFrequency, setMusicFrequency] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const audioRefs = useRef({});

  const playAudio = (song, id, index) => {
    setPlayingState((prevPlayingState) => ({
      ...prevPlayingState,
      [id]: !prevPlayingState[id],
    }));

    if (playingState[id]) {
      audioRefs.current[id].pause();
      // Check if the item completed a full rotation (loop)
      if (audioRefs.current[id].currentTime === 0) {
        setMusicFrequency((prevFrequency) => {
          const newFrequency = [...prevFrequency];
          newFrequency[index] += 1;
          return newFrequency;
        });
        console.log(MusicFrequency)
      }
    } else {
      const audio = new Audio(song);
      audio.volume = volumeState / 100; // Set initial volume
      audio.loop = true;
      audio.play();
      audioRefs.current[id] = audio;
    }
  };

  const handleVolumeChange = (event) => {
    const newVolume = parseInt(event.target.value, 10);
    setVolumeState(newVolume);
    Object.values(audioRefs.current).forEach((audio) => {
      if (audio) {
        audio.volume = newVolume / 100;
      }
    });
  };

  return (
    <div className="flex flex-wrap justify-center items-center gap-4">
      {/* SoundList */}
      <div className="w-full text-center mb-2 mt-0">
        <h2 className="text-3xl font-bold text-white">Sounds</h2>
      </div>
      <div className="flex flex-wrap justify-center items-center gap-4">
        {soundList.map((file, index) => (
          <div
            key={file.id}
            className="relative h-[120px] w-[160px] rounded-xl flex items-center justify-center bg-white overflow-hidden opacity-80 shadow-lg"
            style={{
              backgroundImage: `url(${file.image})`,
              backgroundRepeat: "repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            onMouseEnter={() => setHoveredSoundIndex(index)}
            onMouseLeave={() => setHoveredSoundIndex(null)}
          >
            <button
              className="bg-white rounded-full h-10 w-10 opacity-75 backdrop-blur"
              onClick={() => playAudio(file.audio, file.id, index)}
            >
              <FontAwesomeIcon
                icon={playingState[file.id] ? faPause : faPlay}
                size="sm"
              />
            </button>
            <div className="absolute bottom-0 left-0 right-0 p-2 flex items-center justify-center opacity-100 transition-opacity duration-300 hover:opacity-100 bg-black bg-opacity-80">
              {hoveredSoundIndex === index ? (
                <>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={volumeState}
                    onChange={handleVolumeChange}
                    className="w-5/6 h-2 bg-gray-300 rounded-full appearance-none outline-none"
                  />
                </>
              ) : (
                <div className="text-white">{file.name}</div>
              )}
              <FontAwesomeIcon
                icon={faVolumeHigh}
                className="ml-2 text-white opacity-75 hover:opacity-100 relative bottom-0 right-0"
              />
            </div>
          </div>
        ))}
      </div>

      {/* EffectList */}
      <div className="w-full text-center mt-2 mb-0">
        <h2 className="text-3xl font-bold text-white">Effects</h2>
      </div>
      <div className="flex flex-wrap justify-center items-center gap-4">
        {effectList.map((file, index) => (
          <div
            key={file.id}
            className="relative h-[120px] w-[160px] rounded-xl flex items-center justify-center bg-white overflow-hidden opacity-80 shadow-lg"
            style={{
              backgroundImage: `url(${file.image})`,
              backgroundRepeat: "repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            onMouseEnter={() => setHoveredEffectIndex(index)}
            onMouseLeave={() => setHoveredEffectIndex(null)}
          >
            <button
              className="bg-white rounded-full h-10 w-10 opacity-75 backdrop-blur"
              onClick={() => playAudio(file.audio, file.id, index)}
            >
              <FontAwesomeIcon
                icon={playingState[file.id] ? faPause : faPlay}
                size="sm"
              />
            </button>
            <div className="absolute bottom-0 left-0 right-0 p-2 flex items-center justify-center opacity-100 transition-opacity duration-300 hover:opacity-100 bg-black bg-opacity-80">
              {hoveredEffectIndex === index ? (
                <>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={volumeState}
                    onChange={handleVolumeChange}
                    className="w-5/6 h-2 bg-gray-300 rounded-full appearance-none outline-none"
                  />
                </>
              ) : (
                <div className="text-white">{file.name}</div>
              )}
              <FontAwesomeIcon
                icon={faVolumeHigh}
                className="ml-2 text-white opacity-75 hover:opacity-100 relative bottom-0 right-0"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SetMusic;

