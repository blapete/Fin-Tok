import React, { useState } from "react";
import { connect } from "react-redux";
import { Button, FormGroup, FormControl } from "react-bootstrap";
import { signUp } from "../../actions/account";
import { Link, Redirect } from "react-router-dom";
import requestStates from "../../reducers/request";
import "./Signup.css";

const Signup = ({ signup, status, message, history }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [buttonClicked, setButtonClicked] = useState(false);
  const [toLogin, setToLogin] = useState(false);

  const updateUsername = (event) => {
    setUsername(event.target.value);
  };

  const updateEmail = (event) => {
    setEmail(event.target.value);
  };

  const updatePassword = (event) => {
    setPassword(event.target.value);
  };
  const updateConfirmPassword = (event) => {
    setConfirmPassword(event.target.value);
  };

  //send signup info to backend
  const sendForm = async (e) => {
    e.preventDefault();
    setButtonClicked(true);

    const actionResponse = await signup({
      username,
      email,
      password,
      confirmPassword,
    });
    if (actionResponse.message === "session created") {
      setToLogin(true);
    }
  };

  const Error = () => {
    if (buttonClicked && status === requestStates.error) {
      return <div>{message}</div>;
    }
  };

  return toLogin ? (
    <Redirect to="login" />
  ) : (
    <div id="signup__Box">
      {Error()}
      <br />
      <div id="signup__Form">
        <div className="authform">
          <h6>sign up</h6>
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
                type="email"
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
                onChange={updatePassword}
                placeholder="password (6+ characters)"
              />
            </FormGroup>
            <br />
            <FormGroup>
              <FormControl
                autoComplete="off"
                type="password"
                value={confirmPassword}
                onChange={updateConfirmPassword}
                placeholder="re-type password"
              />
            </FormGroup>
            <br />
            <div>
              <Button
                className="btn btn-secondary"
                style={{ backgroundColor: "rgba(52, 1, 86, 0.5)" }}
                onClick={sendForm}
              >
                Sign Up
              </Button>
            </div>
          </form>
          <br />
        </div>

        <br />
        <Link to="/login" style={{ textDecoration: "none", color: "black" }}>
          <span>Already have an account?</span>
        </Link>
        <br />
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
  signup: signUp,
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
