import React from "react";
import SetMusic from "./SessionSetupComponents/SetMusic";

const EditSession = () => {
  return (
    <div className="flex-1 font-mono bg-[#FFF3DA] p-0 min-h-screen bg-red-600">
      <div className="flex flex-col items-center justify-center h-screen bg-yellow-100">
        <div>
          <SetMusic />
        </div>
      </div>
    </div>
  );
};

export default EditSession;
