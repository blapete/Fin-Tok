import React, { useEffect } from "react";
import { connect } from "react-redux";
import Navbar from "../Navbar/Navbar";

const Homepage = ({ loggedIn }) => {
  useEffect(() => {
    if (!loggedIn) {
      window.location.href = "/";
    }
  }, [loggedIn]);

  return (
    <div>
      <Navbar status={loggedIn} />
      <h1>This is the user homepage</h1>
    </div>
  );
};

const mapStateToProps = (state) => ({
  loggedIn: state.account.loggedIn,
});

export default connect(mapStateToProps, null)(Homepage);
