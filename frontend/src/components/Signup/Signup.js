import React from "react";
import { connect } from "react-redux";
import { MDBBtn, MDBInput } from "mdbreact";
import { Link } from "react-router-dom";
import "./Signup.css";

const Signup = () => {
  return (
    <div id="signup__Box">
      <form id="signup__Form">
        <p className="h5 text-center mb-4">Sign up</p>
        <div className="grey-text">
          <MDBInput label="name" type="text" />
          <MDBInput label="email" type="email" />
          <MDBInput label="password" type="password" />
          <MDBInput label="confirm password" group type="password" />
        </div>
        <div className="text-center">
          <MDBBtn color="dark-green">Register</MDBBtn>
        </div>
      </form>

      <br />
      <Link to="/login" style={{ textDecoration: "none", color: "black" }}>
        <span>Already have an account?</span>
      </Link>
      <br />
      <Link to="/" style={{ textDecoration: "none", color: "black" }}>
        Home
      </Link>
    </div>
  );
};

export default connect(null, null)(Signup);
