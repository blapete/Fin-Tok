import React from "react";
import { connect } from "react-redux";

const Homepage = () => {
  return (
    <div>
      <h1>This is the user homepage</h1>
    </div>
  );
};

export default connect(null, null)(Homepage);
