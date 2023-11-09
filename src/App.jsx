import { useEffect, useState } from "react";
import StarterPage from "./Components/StarterPage";
import Navbar from "./Components/Navbar";
import UserPage from "./Components/UserPage";

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
    <>
      <Navbar />
      <div className="font-mono bg-[#FFF3DA] p-2 min-h-screen ">
        {localstorageName ? (
          <UserPage username={localstorageName}/>
        ) : (
          <StarterPage setUsername={setUsername} handleSubmit={handleSubmit} />
        )}
      </div>
    </>
  );
}

export default App;
