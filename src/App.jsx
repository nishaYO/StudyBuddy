import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { Router, Route, Switch } from "wouter";
import Navbar from "./Components/CoreComponents/Navbar";
import Welcome from "./Components/WelcomeComponents/Welcome";
import SessionSetup from "./Components/SessionSetup";
import Session from "./Components/Session";
import Reports from "./Components/ReportsComponents/Reports";
import Notes from "./Components/NoteComponents/Notes";
import EditNote from "./Components/NoteComponents/EditNote";
import Help from "./Components/InformationComponents/Help";
import EditSession from "./Components/SessionSetupComponents/EditSession";
import User from "./Components/auth/User";

const server_endpoint = import.meta.env.VITE_SERVER_ENDPOINT;
const client = new ApolloClient({
  uri: server_endpoint, 
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
      <div className="fixed left-0 top-0 z-40 w-full">
        <Navbar />
      </div>
        <Switch>
          <Route path="/" component={() => <Welcome />} />
          <Route path="/session-setup" component={() => <SessionSetup />} />
          <Route path="/session" component={Session} />
          <Route path="/edit-session" component={EditSession} />
          <Route path="/reports" component={Reports} />
          <Route path="/notes" component={Notes} />
          <Route path="/edit/:noteId" component={EditNote} />
          <Route path="/help" component={Help} />
          <Route path="/user" component={User} />
        </Switch>
      </Router>
    </ApolloProvider>
  );
}

export default App;
