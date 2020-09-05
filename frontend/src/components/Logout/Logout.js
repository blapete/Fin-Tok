import React from "react";
import { Button } from "react-bootstrap";
import { logoutAction } from "../../actions/account";
import { connect } from "react-redux";

const Logout = ({ logoutGet }) => {
  const logout = (e) => {
    e.preventDefault();
    logoutGet();
  };
  return (
    <div>
      <Button onClick={logout}>Log out</Button>
    </div>
  );
};

const mapStateToProps = (state) => ({
  message: state.message,
});

const mapDispatchToProps = {
  logoutGet: logoutAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Logout);
