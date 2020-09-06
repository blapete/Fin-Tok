import React, { useRef, useState, useEffect } from "react";
import { connect } from "react-redux";
import { Button, FormGroup, FormControl } from "react-bootstrap";
import { signUp } from "../../actions/account";
import requestStates from "../../reducers/request";
import { Link } from "react-router-dom";
import "./Signup.css";

const Signup = ({ signup, status, message }) => {
  //form info reference values
  const nameRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const emailRef = useRef();

  const [buttonClicked, setButtonClicked] = useState(false);

  //send signup info to backend
  const sendForm = (e) => {
    e.preventDefault();
    setButtonClicked(true);
    const username = nameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;
    signup({ username, email, password, confirmPassword }).then(() => {});
  };

  const Error = () => {
    if (buttonClicked && status === requestStates.error) {
      return <div>{message}</div>;
    }
  };

  return (
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
                ref={nameRef}
                placeholder="name"
                name="name"
              />
            </FormGroup>
            <br />
            <FormGroup>
              <FormControl
                type="email"
                autoComplete="off"
                name="email"
                ref={emailRef}
                placeholder="email"
              />
            </FormGroup>
            <br />
            <FormGroup>
              <FormControl
                type="password"
                autoComplete="off"
                name="password"
                ref={passwordRef}
                placeholder="password (6+ characters)"
              />
            </FormGroup>
            <br />
            <FormGroup>
              <FormControl
                type="password"
                autoComplete="off"
                name="confirmPassword"
                ref={confirmPasswordRef}
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
