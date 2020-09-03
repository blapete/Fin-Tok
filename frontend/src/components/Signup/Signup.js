import React, { useRef, useState } from "react";
import { connect } from "react-redux";
import { Button, FormGroup, FormControl } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Signup.css";

const Signup = () => {
  //data for sign up
  const nameRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const emailRef = useRef();

  const signUp = (e) => {
    e.preventDefault();
  };
  return (
    <div id="signup__Box">
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
                onClick={signUp}
              >
                Sign Up
              </Button>
            </div>
          </form>
          <br />

          <div id="notification" />
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

export default connect(null, null)(Signup);
