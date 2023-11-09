import { useEffect, useState } from "react";
import StarterPage from "./Components/StarterPage";
import Navbar from "./Components/Navbar";
import UserPage from "./Components/UserPage";
import SidePanel from "./Components/SidePanel";

function App() {
  const [username, setUsername] = useState("");
  const [localstorageName, setLocalstoragename] = useState("");
  // function to get the username in localstorage
  const handleSubmit = () => {
    localStorage.setItem("username", username);
    window.location.reload();
  };
  // fetch username from localstorage
  useEffect(() => {
    setLocalstoragename(localStorage.getItem("username"));
  }, []);

  return (
    <div className="flex">
      <SidePanel />

      <div className="flex-1 font-mono bg-[#FFF3DA] p-0 min-h-screen">
        <Navbar />
        {localstorageName ? (
          <UserPage username={localstorageName} />
        ) : (
          <StarterPage setUsername={setUsername} handleSubmit={handleSubmit} />
        )}
      </div>
    </div>
  );
}

export default App;
