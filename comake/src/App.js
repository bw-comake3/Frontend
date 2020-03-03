import React from "react";
import logo from "./logo.svg";
import {Route, Switch} from "react-router-dom";

import "./App.css";

import Login from "./components/Auth/Login";
import SignUp from "./components/Auth/SignUp";
import PrivateRoute from "./components/ProtectedRoutes/PrivateRoute";
import ProtectedRouteDashboard from "./components/ProtectedRoutes/ProtectedRouteDashboard";

function App() {
  return (
    <div className="App">
      <Switch>
          <Route exact path="/" render={ (props)=> <Login {...props} /> }/>
          <Route path="/signup" render={ (props) => <SignUp { ...props } /> } />
          <PrivateRoute path="/dashboard" component={ ProtectedRouteDashboard } />
      </Switch>
    </div>
  );
}

export default App;
