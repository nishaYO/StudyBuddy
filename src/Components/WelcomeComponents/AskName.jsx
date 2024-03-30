import React, { useState } from "react";

function AskName({ handleNameSubmit }) {
  // store name in localstorage
  const [username, setUsername] = useState("");
  localStorage.setItem("name", username);

  return (
    <div className="p-2 flex items-center justify-center min-h-screen">
      <div className="bg-white flex flex-col items-center h-80 w-full lg:w-1/2 p-3 border-2 rounded-lg border-[#BEADFA] shadow-lg">
        <h1 className="text-3xl font-extrabold max-w-lg p-3 text-center">
          Welcome to studybuddy
        </h1>
        <input
          type="text"
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Please Enter Name..."
          className="mt-14 p-3"
        />
        <button
          onClick={handleNameSubmit}
          className="mx-auto mt-3 px-5 py-2 bg-[#D0BFFF] hover:bg-[#BEADFA] rounded font-bold"
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default AskName;
