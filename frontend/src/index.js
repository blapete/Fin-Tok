// import "react-app-polyfill/ie9";
// import "react-app-polyfill/ie11";
// import "react-app-polyfill/stable";
import React from "react";
import { render } from "react-dom";
import store from "./store";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { getAuthenticated } from "./actions/account";
import "./index.css";
import About from "./components/About";
import Home from "./components/homepage";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Landing from "./components/Landing";

const AuthRoute = (props) => {
  if (!store.getState().account.loggedIn) {
    return <Redirect to={{ pathname: "/" }} />;
  }
  const { component, path } = props;
  return <Route path={path} component={component} />;
};

store.dispatch(getAuthenticated()).then(() => {
  render(
    <Provider store={store}>
      <Router>
        <Route exact path="/" component={Landing} />
        <Route exact path="/about" component={About} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/login" component={Login} />
        <AuthRoute path="/home" component={Home} />
      </Router>
    </Provider>,
    document.getElementById("root")
  );
});
