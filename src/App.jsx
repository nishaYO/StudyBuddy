import { useEffect, useState } from "react";
import StarterPage from "./Components/StarterPage";

function App() {
  const [username, setUsername] = useState("");
  const [getName, setGetname] = useState("");
  // function to get the username in localstorage
  const handleSubmit = () => {
    localStorage.setItem("username", username);
    window.location.reload();
  };
  // fetch username from localstorage
  useEffect(() => {
    setGetname(localStorage.getItem("username"));
  }, []);

  return (
    <div className="font-mono bg-[#FFF3DA] p-2 min-h-screen ">
      {getName ? (
        <h1 className="flex items-center justify-center">Hello {getName}</h1>
      ) : (
        <StarterPage setUsername={setUsername} handleSubmit={handleSubmit} />
      )}
    </div>
  );
}

export default App;
