import React from "react";
import { connect } from "react-redux";
import Landing from "../Landing/Landing";
import Home from "../UserHome/homepage";

const Root = ({ loggedIn }) => {
  return loggedIn ? <Home /> : <Landing />;
};

const mapStateToProps = (state) => ({
  loggedIn: state.loggedIn,
});

export default connect(mapStateToProps, null)(Root);
