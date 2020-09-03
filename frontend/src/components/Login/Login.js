import React, { useState } from "react";
import { connect } from "react-redux";
import { Button, FormGroup, FormControl } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Login.css";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const updateEmail = (event) => {
    setEmail(event.target.value);
  };

  const updatePassword = (event) => {
    setPassword(event.target.value);
  };

  const login = (e) => {
    e.preventDefault();
  };
  return (
    <div id="login__Box">
      <div id="login__Form">
        <div className="authform">
          <h6>login</h6>

          <br />
          <form autoComplete="off">
            <FormGroup>
              <FormControl
                autoComplete="off"
                type="text"
                placeholder="email"
                value={email}
                onChange={updateEmail}
              />
            </FormGroup>
            <br />
            <FormGroup>
              <FormControl
                autoComplete="off"
                type="password"
                value={password}
                placeholder="password"
                onChange={updatePassword}
              />
            </FormGroup>
            <br />
            <div>
              <Button
                className="btn btn-secondary"
                style={{ backgroundColor: "rgba(52, 1, 86, 0.5)" }}
                onClick={login}
              >
                Log In
              </Button>
            </div>
          </form>
          <br />
        </div>
        <br />
        <Link to="/" style={{ textDecoration: "none", color: "black" }}>
          Home
        </Link>
      </div>
    </div>
  );
};

export default connect(null, null)(Login);
