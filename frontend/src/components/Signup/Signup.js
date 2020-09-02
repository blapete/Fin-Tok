import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./Signup.css";

const Signup = () => {
  return (
    <div id="signup__Box">
      <div id="signup__Form">
        <label className="label is-medium">Sign up</label>

        <div className="field">
          <div className="control has-icons-left has-icons-right">
            <input className="input is-medium" type="text" placeholder="name" />
            <span className="icon is-medium is-left">
              <i className="fas fa-envelope"></i>
            </span>
            <span className="icon is-medium is-right">
              <i className="fas fa-check"></i>
            </span>
          </div>
        </div>
        <div className="field">
          <div className="control has-icons-left has-icons-right">
            <input
              className="input is-medium"
              type="email"
              placeholder="email"
            />
            <span className="icon is-medium is-left">
              <i className="fas fa-envelope"></i>
            </span>
            <span className="icon is-medium is-right">
              <i className="fas fa-check"></i>
            </span>
          </div>
        </div>
        <div className="field">
          <div className="control has-icons-left has-icons-right">
            <input
              className="input is-medium"
              type="password"
              placeholder="password"
            />
            <span className="icon is-medium is-left">
              <i className="fas fa-envelope"></i>
            </span>
            <span className="icon is-medium is-right">
              <i className="fas fa-check"></i>
            </span>
          </div>
        </div>
        <div className="field">
          <div className="control has-icons-left has-icons-right">
            <input
              className="input is-medium"
              type="password"
              placeholder="confirm password"
            />
            <span className="icon is-medium is-left">
              <i className="fas fa-envelope"></i>
            </span>
            <span className="icon is-medium is-right">
              <i className="fas fa-check"></i>
            </span>
          </div>
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
