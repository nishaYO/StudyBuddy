import { useEffect, useState } from "react";
import { Router, Route, Switch } from "wouter";
import Welcome from "./Components/SessionSetup/Welcome";
import Navbar from "./Components/Navbar";
import SidePanel from "./Components/SidePanel";
import SessionSetup from "./Components/Session";
import SessionStarted from "./Components/SessionStarted";
import Reports from "./Components/Reports";
import Help from "./Components/Help";
import LoggedView from "./Components/LoggedView";

function App() {
  const [username, setUsername] = useState("");
  const [localstorageName, setLocalstoragename] = useState("");
  const [totalDuration, setTotalDuration] = useState("2:30");

  // Function to get the username in local storage
  const handleSubmit = () => {
    localStorage.setItem("username", username);
    window.location.reload();
  };

  // Fetch username from local storage
  useEffect(() => {
    setLocalstoragename(localStorage.getItem("username"));
  }, []);
  console.log(localstorageName);
  return (
    <div className="bg-[#FFF3DA] min-h-screen">
      <Router>
        {!localstorageName ? <div className="flex items-center justify-center min-h-screen">
          <Welcome setUsername={setUsername} handleSubmit={handleSubmit} />
        </div> : 
          <LoggedView/>
        }
      </Router>
    </div>
  );
}

export default App;
