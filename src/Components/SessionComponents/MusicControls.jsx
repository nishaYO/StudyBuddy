import {
  faMusic,
  faVolumeHigh,
  faVolumeMute
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { React, useState } from "react";
import { useLocation } from "wouter";

const MusicControls = () => {
  // music controls logic
  const [isVolumeMuted, setIsVolumeMuted] = useState(false);
  const [location, navigate] = useLocation();

  const handleMusicIconClick = () => {
    navigate("/edit-session");
  };

  const handleVolumeIconClick = () => {
    setIsVolumeMuted((prev) => !prev);
  };

  const handleVolumeControlDotMove = (event) => {
    const dotPosition = event.clientX;
    //console.log("Volume control dot moved to:", dotPosition);
  };

  return (
    <div>
      {" "}
      {/* upper tray */}
      <div className=" p-3 flex flex-row items-center justify-center gap-10 w-screen">
        <div className="flex justify-between p-4 bg-gray-800 text-white">
          {/* Music icon button */}
          <button className="mr-4" onClick={handleMusicIconClick}>
            <FontAwesomeIcon icon={faMusic} size="lg" />
          </button>

          {/* Volume control icon */}
          <button className="mr-4" onClick={handleVolumeIconClick}>
            <FontAwesomeIcon
              icon={isVolumeMuted ? faVolumeMute : faVolumeHigh}
              size="lg"
            />
          </button>

          {/* Volume control horizontal line with dot */}
          <div className="relative" onMouseMove={handleVolumeControlDotMove}>
            <div className="h-2 w-24 bg-gray-600 rounded-full mx-2 mt-1">
              {/* Dot for volume control */}
              <div className="absolute h-4 w-4 bg-white rounded-full top-0 transform -translate-x-1/2 -translate-y-1/2"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicControls;
