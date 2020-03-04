import React from "react";
import {Route, Switch} from "react-router-dom";

import "./App.css";

import Login from "./components/Auth/Login";
import SignUp from "./components/Auth/SignUp";
import PrivateRoute from "./components/ProtectedRoutes/PrivateRoute";
import ProtectedRouteDashboard from "./components/ProtectedRoutes/ProtectedRouteDashboard";
import ProtectedRouteIssue from "./components/ProtectedRoutes/ProtectedRouteIssue";

function App() {
  return (
    <div className="App">
      <Switch>
          <Route exact path="/" render={ (props)=> <Login {...props} /> }/>
          <Route path="/signup" render={ (props) => <SignUp { ...props } /> } />
          <PrivateRoute path="/dashboard" component={ ProtectedRouteDashboard } />
          <PrivateRoute path="/issues/:id" component={ ProtectedRouteIssue } />
      </Switch>
    </div>
  );
}

export default App;
