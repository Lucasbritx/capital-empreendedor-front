import React from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import Clients from './pages/Clients'
import ClientInfo from './pages/ClientInfo'

const Routes: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/clients" component={Clients} />
        <Route exact path="/client/info/:email" component={ClientInfo}/>

        <Redirect exact from="/" to="clients" />

        <Route path="/404">
          <div>not found</div>
        </Route>
        <Redirect from="*" to="/404" />
      </Switch>
    </Router>
  );
};

export default Routes;
