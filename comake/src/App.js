import React from "react";
import {Route, Switch} from "react-router-dom";

import "./App.css";
import Login from "./components/Auth/Login";
import SignUp from "./components/Auth/SignUp";
import PrivateRoute from "./components/ProtectedRoutes/PrivateRoute";
import ProtectedRouteDashboard from "./components/ProtectedRoutes/ProtectedRouteDashboard";
import ProtectedRouteIssue from "./components/ProtectedRoutes/ProtectedRouteIssue";
import ProtectedRouteAddIssue from "./components/ProtectedRoutes/ProtectedRouteAddIssue";
import ProtectedRouteMyIssues from "./components/ProtectedRoutes/ProtectedRouteMyIssues";
import ProtectedRouteMyIssue from "./components/ProtectedRoutes/ProtectedRouteMyIssue";

function App() {
  return (
    <div className="App">
        <Switch>
            <Route exact path="/" render={ (props)=> <Login {...props} /> }/>
            <Route path="/signup" render={ (props) => <SignUp { ...props } /> } />
            <PrivateRoute path="/dashboard" component={ ProtectedRouteDashboard } />
            <PrivateRoute path="/issues/:id" component={ ProtectedRouteIssue } />
            <PrivateRoute path="/addIssue" component={ ProtectedRouteAddIssue } />
            <PrivateRoute path="/myIssues/:id" component={ ProtectedRouteMyIssue } />
            <PrivateRoute path="/myIssues" component={ ProtectedRouteMyIssues } />
        </Switch>
    </div>
) }

export default App;
