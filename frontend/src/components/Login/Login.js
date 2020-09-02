import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { MDBInput, MDBBtn } from "mdbreact";
import "./Login.css";
const Login = () => {
  return (
    <div id="login__Box">
      <div id="login__Form">
        <form>
          <p className="h5 text-center mb-4">Log in</p>
          <div className="grey-text">
            <MDBInput label="email" type="email" />
            <MDBInput label="password" type="password" />
          </div>
          <div className="text-center">
            <MDBBtn color="dark-green">Login</MDBBtn>
          </div>
        </form>
        <br />
        <Link to="/" style={{ textDecoration: "none", color: "black" }}>
          Home
        </Link>
      </div>
    </div>
  );
};

export default connect(null, null)(Login);
