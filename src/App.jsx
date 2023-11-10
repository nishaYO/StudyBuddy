import { useEffect, useState } from "react";
import { Router, Route, Switch } from "wouter";
import Welcome from "./Components/SessionSetup/Welcome";
import Navbar from "./Components/Navbar";
import SidePanel from "./Components/SidePanel";
import SessionSetup from "./Components/Session";
import SessionStarted from "./Components/SessionStarted";
import Reports from "./Components/Reports";
import Help from "./Components/Help";

function App() {
  const [username, setUsername] = useState("");
  const [localstorageName, setLocalstoragename] = useState("");

  // Function to get the username in local storage
  const handleSubmit = () => {
    localStorage.setItem("username", username);
    window.location.reload();
  };

  // Fetch username from local storage
  useEffect(() => {
    setLocalstoragename(localStorage.getItem("username"));
  }, []);

  return (
    <Router>
      <div className="flex">
        <SidePanel />

        <div className="flex-1 font-mono bg-[#FFF3DA] p-0 min-h-screen">
          <Navbar />
          <Switch>
            {/* <Route path="/">
              {localstorageName ? (
                <UserPage username={localstorageName} />
              ) : (
                <Welcome setUsername={setUsername} handleSubmit={handleSubmit} />
              )}
            </Route> */}
            <Route path="/" component={SessionSetup} />
            <Route path="/session-started" component={SessionStarted} />
            <Route path="/reports" component={Reports} />
            <Route path="/help" component={Help} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
