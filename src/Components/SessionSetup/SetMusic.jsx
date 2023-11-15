import { useState,useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause } from "@fortawesome/free-solid-svg-icons";
const soundList = [
  {
    id: 1,
    name: "Meditation",
    image: "https://media.giphy.com/media/3o8dFlRx9QGDdfs3UQ/giphy.gif",
    audio: "./soundsAndEffects/sounds/purrple-cat-crescent-moon.mp3",
    volume: 0.5,
  },
  {
    id: 2,
    name: "Nature Sounds",
    image: "https://media.giphy.com/media/n9h61thJkq6Xe/giphy.gif",
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
];

const effectList = [
  {
    id: 4,
    name: "Rain",
    image: "https://media.giphy.com/media/1fnu914Z79qQpVi2xZ/giphy.gif",
    audio: "./soundsAndEffects/effects/effect_rain.mp3",
    volume: 0.5,
  },
  {
    id: 5,
    name: "Fire",
    image: "https://media.giphy.com/media/rkSu72ptAZseQ/giphy.gif",
    audio: "./soundsAndEffects/effects/effect_fire.mp3",
    volume: 0.5,
  },
  {
    id: 6,
    name: "Forest",
    image: "https://media.giphy.com/media/VFqafDSTxP0ic/giphy.gif",
    audio: "./soundsAndEffects/effects/effect_forest.mp3",
    volume: 0.5,
  },
];

const combinedSounds = [...soundList, ...effectList];
function SetMusic() {
  const [playingState, setPlayingState] = useState({}); // Track play/pause state for each song
  const audioRefs = useRef({}); // Use refs to store audio elements for each song

  const playAudio = (song, id) => {
    setPlayingState((prevPlayingState) => ({
      ...prevPlayingState,
      [id]: !prevPlayingState[id], // Toggle play/pause state
    }));
  
    if (playingState[id]) {
      audioRefs.current[id].pause();
    } else {
      const audio = new Audio(song);
      audio.loop = true; // Set loop to true
      audio.play();
      audioRefs.current[id] = audio;
    }
  };
  

  return (
    <div className="flex flex-wrap justify-center items-center gap-3">
      <div className="w-full text-center mb-4">
        <h2 className="text-2xl font-bold text-white">Sounds</h2>
      </div>
      <div className="flex flex-wrap justify-center items-center gap-3">
        {soundList.map((file) => (
          <div
            key={file.id}
            className="relative h-[133px] w-[133px] rounded-xl flex items-center justify-center bg-white opacity-80"
            style={{
              backgroundImage: `url(${file.image})`,
              backgroundRepeat: "repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <button
              className="bg-white rounded-full h-10 w-10 opacity-75 backdrop-blur"
              onClick={() => playAudio(file.audio, file.id)}
            >
              <FontAwesomeIcon icon={playingState[file.id] ? faPause : faPlay} />
            </button>
            <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black to-transparent text-white text-center">
              {file.name}
            </div>
          </div>
        ))}
      </div>
      <div className="w-full text-center mt-4 mb-4">
        <h2 className="text-2xl font-bold text-white">Effects</h2>
      </div>
      <div className="flex flex-wrap justify-center items-center gap-3">
        {effectList.map((file) => (
          <div
            key={file.id}
            className="relative h-[133px] w-[133px] rounded-xl flex items-center justify-center bg-white opacity-80"
            style={{
              backgroundImage: `url(${file.image})`,
              backgroundRepeat: "repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <button
              className="bg-white rounded-full h-10 w-10 opacity-75 backdrop-blur"
              onClick={() => playAudio(file.audio, file.id)}
            >
              <FontAwesomeIcon icon={playingState[file.id] ? faPause : faPlay} />
            </button>
            <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black to-transparent text-white text-center">
              {file.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SetMusic;