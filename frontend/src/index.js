import React from "react";
import { render } from "react-dom";
import store from "./store";
import history from "./history";
import { Provider } from "react-redux";
import { Router, Switch, Route, Redirect } from "react-router-dom";
import { setAuthenticatedAction } from "./actions/accountAction";
import "bootstrap-css-only/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "mdbreact/dist/css/mdb.css";
import "./index.css";
import Root from "./components/Root/Root";
import Home from "./components/UserHome/homepage";

const AuthRoute = (props) => {
  if (!store.getState().account.loggedIn) {
    return <Redirect to={{ pathname: "/" }} />;
  }

  const { component, path } = props;

  return <Route path={path} component={component} />;
};

store.dispatch(setAuthenticatedAction()).then(() => {
  render(
    <Provider store={store}>
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={Root} />
          <AuthRoute path="/home" component={Home} />
        </Switch>
      </Router>
    </Provider>,
    document.getElementById("root")
  );
});
