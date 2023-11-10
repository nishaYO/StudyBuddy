import React from "react";
import { Router, Route, Switch } from "wouter";
import Navbar from "./Navbar";
import SidePanel from "./SidePanel";
import SetTimer from "./SessionSetup/SetTimer";
import SetBreaks from "./SessionSetup/SetBreaks";
import SetMusic from "./SessionSetup/SetMusic";

function LoggedView() {
  return (
    <Router>
      <div>
      <Navbar />
      <div className="flex gap-2 ">
        <SidePanel />
        <div className="lg:ml-8 mt-2">
        <Switch>
          <Route path="/" component={SetTimer}/>
          <Route path="/set-brakes" component={SetBreaks}/>
          <Route path="/set-music" component={SetMusic}/>
        </Switch>
        </div>
      </div>
    </div>
    </Router>
  );
}

export default LoggedView;
