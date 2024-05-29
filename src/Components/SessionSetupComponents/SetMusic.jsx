import { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPause,
  faVolumeMute,
  faVolumeHigh,
  faVolumeLow,
  faVolumeUp,} from "@fortawesome/free-solid-svg-icons";

// url example for this page : "sessionsetup/setmusic?song1=Meditation&volume1=50&song2=NatureSounds&volume2=75"

function SetMusic({ sessionDuration }) {
  const [hoveredSoundIndex, setHoveredSoundIndex] = useState(false);
  const [hoveredEffectIndex, setHoveredEffectIndex] = useState(false);

  const audioRefs = useRef({});

  // creating states for the music items in sounds and effects
  const [soundList, setSoundList] = useState([
    {
      id: 1,
      name: "Meditation",
      image: "https://media.giphy.com/media/8pO7dRS7JRxigBSLKF/giphy.gif",
      audio: "./soundsAndEffects/sounds/purrple-cat-crescent-moon.mp3",
      volume: 0.5,
      frequency: 0,
      playingState: false,
    },
    {
      id: 2,
      name: "Nature Sounds",
      image: "https://media.giphy.com/media/Yg12tqyJwylsk/giphy.gif",
      audio: "./soundsAndEffects/sounds/Ghostrifter-Official-Celestia.mp3",
      volume: 0.5,
      frequency: 0,
      playingState: false,
    },
    {
      id: 3,
      name: "Calm Music",
      image: "https://media.giphy.com/media/q10hztkXiFFmhBbH2l/giphy.gif",
      audio: "./soundsAndEffects/sounds/Lost-and-Found.mp3",
      volume: 0.5,
      frequency: 0,
      playingState: false,
    },
    {
      id: 4,
      name: "Drum",
      image: "https://media.giphy.com/media/1w3KfcZeu8d0GsC89V/giphy.gif",
      audio: "./soundsAndEffects/sounds/drum.mp3",
      volume: 0.5,
      frequency: 0,
      playingState: false,
    },
    {
      id: 5,
      name: "Seeking Peace",
      image: "https://media.giphy.com/media/dNgK7Ws7y176U/giphy.gif",
      audio: "./soundsAndEffects/sounds/seeking peace.mp3",
      volume: 0.5,
      frequency: 0,
      playingState: false,
    },
    {
      id: 6,
      name: "Otjanbird",
      image: "https://media.giphy.com/media/l0IyirIYBWR4CwJWw/giphy.gif",
      audio: "./soundsAndEffects/sounds/track_Otjanbird-Pt.-II.mp3",
      volume: 0.5,
      frequency: 0,
      playingState: false,
    },
  ]);

  const [effectList, setEffectList] = useState([
    {
      id: 7,
      name: "Rain",
      image: "https://media.giphy.com/media/PbOaO2fedzQLm/giphy.gif",
      audio: "./soundsAndEffects/effects/effect_rain.mp3",
      volume: 0.5,
      frequency: 0,
      playingState: false,
    },
    {
      id: 8,
      name: "Fire",
      image: "https://media.giphy.com/media/mukI8MtW2BHhjj4INb/giphy.gif",
      audio: "./soundsAndEffects/effects/effect_fire.mp3",
      volume: 0.5,
      frequency: 0,
      playingState: false,
    },
    {
      id: 9,
      name: "River",
      image: "https://media.giphy.com/media/93lPhTvisYUenR7Uhb/giphy.gif",
      audio: "./soundsAndEffects/effects/effect_river.mp3",
      volume: 0.5,
      frequency: 0,
      playingState: false,
    },
    {
      id: 10,
      name: "Nightfall",
      image: "https://media.giphy.com/media/PUZY5bpax4yVpqfufb/giphy.gif",
      audio: "./soundsAndEffects/effects/effect_nightFall.mp3",
      volume: 0.5,
      frequency: 0,
      playingState: false,
    },
    {
      id: 11,
      name: "Forest",
      image: "https://media.giphy.com/media/KHh7jLrG6gIXBTnxsp/giphy.gif",
      audio: "./soundsAndEffects/effects/effect_forest.mp3",
      volume: 0.5,
      frequency: 0,
      playingState: false,
    },
    {
      id: 12,
      name: "Waves",
      image: "https://media.giphy.com/media/xT0GqcCJJJH12hJvGM/giphy.gif",
      audio: "./soundsAndEffects/effects/effect_wavesHittingRocks.mp3",
      volume: 0.5,
      frequency: 0,
      playingState: false,
    },
  ]);
  const [soundVolumeState, setSoundVolumeState] = useState(
    soundList.map(() => 50)
  );
  const [effectVolumeState, setEffectVolumeState] = useState(
    effectList.map(() => 50)
  );
  const playAudio = (song, id, index, isEffect) => {
    const list = isEffect ? effectList : soundList;
    const setList = isEffect ? setEffectList : setSoundList;

    // prevlist is either soundlist or effectlist based on the above two values
    setList((prevList) => {
      // create a shallow copy of the array: prevList
      const newList = [...prevList];
      // toggle the playingState
      newList[index] = {
        ...newList[index],
        playingState: !newList[index].playingState,
      };
      return newList;
    });
    let pauseTime = 0;
    // play/pause/resume the song
    if (list[index].playingState) {
      // pause the song
      audioRefs.current[id].pause();
    } else {
      // play the song on loop
      const audio = new Audio(song);
      audio.volume = list[index].volume;
      audio.loop = true;
      audio.play();
      audioRefs.current[id] = audio;
    }
  };

  const handleVolumeChange = (event, isEffect, index) => {
    const newVolume = parseInt(event.target.value, 10);
    const list = isEffect ? effectList : soundList;
    const setList = isEffect ? setEffectList : setSoundList;
    const setVolume = isEffect ? setEffectVolumeState : setSoundVolumeState;

    setList((prevList) => {
      const newList = [...prevList];
      newList[index] = { ...newList[index], volume: newVolume / 100 };
      return newList;
    });

    const volumeState = isEffect ? effectVolumeState : soundVolumeState;
    const setVolumeState = isEffect
      ? setEffectVolumeState
      : setSoundVolumeState;

    setVolumeState((prevVolumeState) => {
      const newVolumeState = [...prevVolumeState];
      newVolumeState[index] = newVolume;
      return newVolumeState;
    });

    const audioId = list[index].id;

    if (audioRefs.current[audioId]) {
      audioRefs.current[audioId].volume = newVolume / 100;
    }
  };

  return (
    <div className="flex flex-wrap justify-center items-center gap-4 mt-6">
      {/* SoundList */}
      <div className="w-full text-center">
        <h2 className="text-3xl font-bold text-black">Sounds</h2>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
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
              onClick={() => playAudio(file.audio, file.id, index, false)}
            >      
              <FontAwesomeIcon
                icon={file.playingState ? faPause : faPlay}
                size="sm"
              />
            </button>
            <div className="absolute bottom-0 left-0 right-0 p-2 flex items-center justify-center opacity-100 transition-opacity duration-300 hover:opacity-100 bg-black bg-opacity-80">
              {index === hoveredSoundIndex ? (
                <>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={soundVolumeState[index]}
                    onChange={(event) =>
                      handleVolumeChange(event, false, index)
                    }
                    className="w-5/6 h-2 bg-gray-300 rounded-full appearance-none outline-none"
                  />
                </>
              ) : (
                <div className="text-white whitespace-nowrap overflow-hidden text-ellipsis">{file.name}</div>
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
      <div className="w-full text-center">
        <h2 className="text-3xl font-bold text-black">Effects</h2>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
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
              onClick={() => playAudio(file.audio, file.id, index, true)}
            >
              <FontAwesomeIcon
                icon={file.playingState ? faPause : faPlay}
                size="sm"
              />
            </button>
            <div className="absolute bottom-0 left-0 right-0 p-2 flex items-center justify-center opacity-100 transition-opacity duration-300 hover:opacity-100 bg-black bg-opacity-80">
              {index === hoveredEffectIndex ? (
                <>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={effectVolumeState[index]}
                    onChange={(event) => handleVolumeChange(event, true, index)}
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
