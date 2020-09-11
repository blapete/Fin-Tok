import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getFavoritesAction } from "../../actions/favorites";
import { Card } from "react-bootstrap";

import {
  Container,
  Row,
  Col,
  Spinner,
  Button,
  ListGroup,
} from "react-bootstrap";
import Navbar from "../Navbar/Navbar";
import StockCard from "./Cards";
import "./Home.css";

const Homepage = ({
  loggedIn,
  name,
  favGet,
  username,
  favoritesList,
  current,
}) => {
  let count = 0;
  const [loading, setLoading] = useState(false);
  const [cards, setCards] = useState(false);
  const [dataReturned, setDataReturned] = useState(false);
  useEffect(() => {
    if (!loggedIn) {
      window.location.href = "/";
    }
  }, [loggedIn]);

  //useEffect get favorites names, render as buttons.
  //onclick get the data from yahooFinance.
  //delete button to remove from db favorites.
  useEffect(() => {
    if (current.ask) {
      setDataReturned(true);
    }
  }, [current]);

  const getFavorites = (e) => {
    e.preventDefault();
    if (favoritesList.length) {
      return console.log("one");
    } else {
      setLoading(true);
      favGet({ username }).then((res) => {
        console.log(res);
        let message = res.message;
        setTimeout(() => {
          if (message === "success - favorites found") {
            setLoading(false);
            setCards(true);
          }
        }, [1500]);
      });
    }
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
            <ListGroup>
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

      <br />
      <div>
        <Row>
          {cards ? (
            <Col>
              <div style={{ margin: "4rem" }}>
                {favoritesList.map((e, index) => {
                  return (
                    <StockCard
                      key={index}
                      id={e.id}
                      name={e.name}
                      symbol={e.symbol}
                    />
                  );
                })}
              </div>
            </Col>
          ) : null}

          {/* {dataReturned && cards ? (
            <Col>
              <div style={{ margin: "4rem" }}>
                <Card
                  style={{
                    width: "18rem",
                    position: "relative",
                  }}
                  className="mb-2 stock__Cards"
                >
                  <Card.Header>{current.symbol}</Card.Header>
                  <Card.Body>
                    <Card.Text>
                      <strong>{current.name}</strong>{" "}
                    </Card.Text>
                    <hr />

                    <div>
                      <Card.Text>Currency: {current.currency}</Card.Text>
                      <Card.Text>Market Cap: {current.marketCap}</Card.Text>
                      <Card.Text>
                        52 week low % change: {current.fiftyTwoWeekLow}
                      </Card.Text>
                    </div>
                  </Card.Body>
                </Card>
              </div>
            </Col>
          ) : null} */}
        </Row>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  loggedIn: state.account.loggedIn,
  name: state.account.username,
  username: state.account.username,
  favoritesList: state.stocks.favorites,
  current: state.stocks.stock_quote,
});

const mapDispatchToProps = {
  favGet: getFavoritesAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);
