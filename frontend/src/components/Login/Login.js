import React, { useState } from "react";
import { connect } from "react-redux";
import { Button, FormGroup, FormControl } from "react-bootstrap";
import { login } from "../../actions/account";
import { Link } from "react-router-dom";
import requestStates from "../../reducers/request";
import "./Login.css";

const Login = ({ loginPost, message, status, history }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [buttonClicked, setButtonClicked] = useState(false);

  const updateUsername = (event) => {
    setUsername(event.target.value);
  };

  const updatePassword = (event) => {
    setPassword(event.target.value);
  };

  const loginFunc = async (e) => {
    e.preventDefault();
    setButtonClicked(true);

    const actionResponse = await loginPost({ username, password });
    if (
      actionResponse.message === "session created" ||
      actionResponse.message === "session restored"
    ) {
      window.location.href = "/home";
    }
  };

  const Error = () => {
    if (buttonClicked && status === requestStates.error) {
      return <div>{message}</div>;
    }
  };

  return (
    <div id="login__Box">
      {Error()}
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
                onClick={loginFunc}
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
  message: state.account.message,
  status: state.account.status,
});

const mapDispatchToProps = {
  loginPost: login,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
