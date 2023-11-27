import { Router, Route, Switch } from "wouter";
import Welcome from "./Components/Welcome";
import SessionSetup from "./Components/SessionSetup";
import Session from "./Components/Session";
import Reports from "./Components/Reports";
import Help from "./Components/Help";
import SessionTest from "./Components/SessionTest";

function App() {

  return (
    <Router>
          <Switch>
            <Route path="/" component={() => <Welcome />} />
            <Route path="/session-setup" component={() => <SessionSetup />} />
            <Route path="/session" component={Session} />
            <Route path="/reports" component={Reports} />
            <Route path="/help" component={Help} />
            <Route path="/session-test" component={SessionTest} />
          </Switch>
    </Router>
  );
}

export default App;
