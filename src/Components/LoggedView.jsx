import React from "react";
import { Router, Route, Switch } from "wouter";
import Navbar from "./Navbar";
import SidePanel from "./SidePanel";
import SetTimer from "./SessionSetup/SetTimer";
import SetBreaks from "./SessionSetup/SetBreaks";

function LoggedView() {
  return (
    <Router>
      <div>
      <Navbar />
      <div className="flex gap-2">
        <SidePanel />
        <Switch>
          <Route path="/" component={SetTimer}/>
          <Route path="/set-brakes" component={SetBreaks}/>
        </Switch>
      </div>
    </div>
    </Router>
  );
}

export default LoggedView;
