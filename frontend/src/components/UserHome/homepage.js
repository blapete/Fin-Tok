import React from "react";
import { connect } from "react-redux";
import Logout from "../Logout/Logout";

const Homepage = () => {
  return (
    <div>
      <h1>This is the user homepage</h1>
      <Logout />
    </div>
  );
};

export default connect(null, null)(Homepage);
