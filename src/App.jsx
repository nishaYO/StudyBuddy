import { useEffect, useState } from "react";
import { Router, Route, Switch } from "wouter";
import Welcome from "./Components/SessionSetup/Welcome";
import SessionSetup from "./Components/SessionSetup";
import Session from "./Components/Session";
import Reports from "./Components/Reports";
import Help from "./Components/Help";

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

  return (
    <Router>
          <Switch>
            <Route path="/" component={() => <SessionSetup totalDurationProp={setTotalDuration} />} />
            <Route path="/session" component={Session} />
            <Route path="/reports" component={Reports} />
            <Route path="/help" component={Help} />
          </Switch>
    </Router>
  );
}

export default App;
