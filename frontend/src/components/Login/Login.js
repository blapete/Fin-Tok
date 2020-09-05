import React, { useState } from "react";
import { connect } from "react-redux";
import { Button, FormGroup, FormControl } from "react-bootstrap";
import { loginAction } from "../../actions/account";
import { Link } from "react-router-dom";
import "./Login.css";
const Login = ({ loginPost }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const updateUsername = (event) => {
    setUsername(event.target.value);
  };

  const updatePassword = (event) => {
    setPassword(event.target.value);
  };

  const login = (e) => {
    e.preventDefault();
    loginPost({ username, password });
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
                placeholder="username"
                value={username}
                onChange={updateUsername}
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

const mapStateToProps = (state) => ({
  message: state.message,
});

const mapDispatchToProps = {
  loginPost: loginAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
