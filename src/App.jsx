import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { Router, Route, Switch } from "wouter";
import Welcome from "./Components/Welcome";
import SessionSetup from "./Components/SessionSetup";
import Session from "./Components/Session";
import Reports from "./Components/Reports";
import Help from "./Components/Help";
import EditSession from "./Components/EditSession";
import User from "./Components/auth/User";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

const [token, setToken] = useState(false);

if (token) {
  sessionStorage.setItem("token", JSON.stringify(token));
}

useEffect(() => {
  if (sessionStorage.getItem("token")) {
    let data = JSON.parse(sessionStorage.getItem("token"));
    setToken(data);
  }
}, []);

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Switch>
          <Route path="/" component={() => <Welcome />} />
          <Route path="/session-setup" component={() => <SessionSetup />} />
          <Route path="/session" component={Session} />
          <Route path="/edit-session" component={EditSession} />
          <Route path="/reports" component={Reports} />
          <Route path="/help" component={Help} />
          <Route path="/user" component={User} />
        </Switch>
      </Router>
    </ApolloProvider>
  );
}

export default App;
