import { useState } from "react";
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
  const [playingId, setplayingId] = useState(null);
  const playAudio = (song, id) => {
    if (playingId === id) {
      setplayingId(null);
    } else {
      setplayingId(id);
      const audio = new Audio(song);
      audio.play();
    }
  };
  return (
    <div className="flex flex-wrap justify-center items-center gap-3">
      {combinedSounds.map((file) => (
        <div
          key={file.id}
          className="h-[200px] w-[200px] rounded-xl  flex items-center justify-center bg-white opacity-80"
          style={{
            backgroundImage: `url(${file.image})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <button
            className="bg-white rounded-full h-14 w-14 opacity-75 backdrop-blur"
            onClick={() => playAudio(file.audio,file.id)}
          >
            <FontAwesomeIcon icon={playingId === file.id ? faPause : faPlay} />
          </button>
        </div>
      ))}
    </div>
  );
}

export default SetMusic;
