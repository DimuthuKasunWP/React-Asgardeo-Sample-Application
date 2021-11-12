import React from 'react';
import ReactDOM from 'react-dom';
import LandingPage from './pages/Landing';
import NotFoundPage from './pages/NotFound';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import * as serviceWorker from './serviceWorker';
import * as authConfig from "./config.json";
import { AuthProvider, SecureRoute, useAuthContext } from "@asgardeo/auth-react";
import Home from './pages/Home';

const SecureRedirect = (props) => {
  const { component, path } = props;
  const { signIn } = useAuthContext();

  const callback = () => {
    signIn();
  };

  return (<SecureRoute exact path={path} component={component} callback={callback} />);
};

ReactDOM.render(
  <AuthProvider config={authConfig.default}>
    <Router>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <SecureRedirect exact path="/home" component={Home} />
        <Route component={NotFoundPage} />
      </Switch>
    </Router>
  </AuthProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
