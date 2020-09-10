import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getFavoritesAction } from "../../actions/favorites";

import {
  Container,
  Row,
  Col,
  Spinner,
  Button,
  ListGroup,
} from "react-bootstrap";
import Navbar from "../Navbar/Navbar";
import "./Home.css";

const Homepage = ({ loggedIn, name, favGet, username }) => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (!loggedIn) {
      window.location.href = "/";
    }
  }, [loggedIn]);

  //useEffect get favorites names, render as buttons.
  //onclick get the data from yahooFinance.
  //delete button to remove from db favorites.
  useEffect(() => {
    console.log("get the favorites data");
  }, []);

  const getFavorites = (e) => {
    e.preventDefault();
    setLoading(true);
    favGet({ username }).then((res) => {
      console.log(res);
      let message = res.message;
      setTimeout(() => {
        if (message === "success - favorites found") {
          setLoading(false);
        }
      }, [1500]);
    });
  };

  return (
    <div>
      <Navbar status={loggedIn} />
      <Container id="home__Container">
        <Row>
          <h5>
            Hi, <strong>{name}</strong>
          </h5>
        </Row>
        <br />
      </Container>
      <div style={{ margin: "2rem 2rem" }}>
        <Row>
          <Col xs={6} sm={6} md={6} lg={6} xl={6}>
            <ListGroup defaultActiveKey="#link1">
              <ListGroup.Item action onClick={getFavorites}>
                view my favs
              </ListGroup.Item>
              <ListGroup.Item action>do something else</ListGroup.Item>
              <ListGroup.Item action>do somethng else</ListGroup.Item>
            </ListGroup>
          </Col>
          <Col>
            This is your homepage. You can view your favorites, remove them, and
            add more from the homepage.
          </Col>
        </Row>
      </div>
      <br />

      {loading ? (
        <Container>
          <Row>
            <div style={{ margin: "0 auto" }}>
              <div className="divider"></div>

              <Spinner
                animation="border"
                role="status"
                style={{ margin: "1rem" }}
              >
                <span className="sr-only">Loading...</span>
              </Spinner>

              <div className="divider"></div>
            </div>
          </Row>
        </Container>
      ) : null}

      <Row>
        <br />
        <br />
      </Row>
    </div>
  );
};

const mapStateToProps = (state) => ({
  loggedIn: state.account.loggedIn,
  name: state.account.username,
  username: state.account.username,
});

const mapDispatchToProps = {
  favGet: getFavoritesAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);
