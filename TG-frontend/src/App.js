import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { UserRoute } from "./Services/UserGaurd";
import Login from "./jsx/Pages/Login";
import { SignUp } from "./jsx/Pages/Signup";
import { DashboardHome } from "./jsx/Pages/DashboardHome/dashboardHome";
import { UserProfile } from "./jsx/Pages/UserProfile/UserProfile";
import { CommonRoute } from "./Services/CommonGaud";
export default function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path={"/"} component={Login} />
          <Route exact path={"/signup"} component={SignUp} />
          <UserRoute path={"/dashboard"} component={DashboardHome} />
          <CommonRoute path={"/profile"} component={UserProfile} />
        </Switch>
      </Router>
    </div>
  );
}
