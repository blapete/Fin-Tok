import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import Navbar from "../Navbar/Navbar";
import "./Home.css";

const Homepage = ({ loggedIn, name }) => {
  useEffect(() => {
    if (!loggedIn) {
      window.location.href = "/";
    }
  }, [loggedIn]);

  //useEffect get favorites names, render as buttons.
  //onclick get the data from yahooFinance.
  //delete button to remove from db favorites.

  return (
    <div>
      <Navbar status={loggedIn} />
      <Container id="home__Container">
        <Row>
          <span>
            Hi, <strong>{name}</strong>
          </span>
        </Row>
      </Container>
    </div>
  );
};

const mapStateToProps = (state) => ({
  loggedIn: state.account.loggedIn,
  name: state.account.username,
});

export default connect(mapStateToProps, null)(Homepage);
