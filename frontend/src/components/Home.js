import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { allFavorites } from "../actions/accountStocks";
import AccountStocks from "./AccountStocks";
import Navbar from "./Navbar";
import { Card, Container, Row, Col, Spinner, ListGroup } from "react-bootstrap";
//--------------------

//Component
const Homepage = ({ current, favGet, favoritesList, loggedIn, username }) => {
  const [loading, setLoading] = useState(false);
  const [cards, setCards] = useState(false);
  const [dataReturned, setDataReturned] = useState(false);
  const [error, setError] = useState({
    message: "",
  });
  const [buttonClicked, setButtonClicked] = useState(false);
  useEffect(() => {
    if (!loggedIn) {
      window.location.href = "/";
    }
  }, [loggedIn]);

  useEffect(() => {
    console.log(dataReturned, buttonClicked, current);
    console.log("helllooooo");
    if (current.symbol) {
      setDataReturned(true);
    }
  }, [current]);

  const getFavorites = (e) => {
    e.preventDefault();
    setButtonClicked(true);
    if (favoritesList.length) {
      return setCards(true);
    } else {
      setLoading(true);
      favGet({ username }).then((res) => {
        let message = res.message;
        setTimeout(() => {
          if (message === "success - favorites found") {
            setLoading(false);
            setCards(true);
          } else if (message === "You have not added any to favorites") {
            setLoading(false);
            setError({
              ...error,
              message,
            });
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
            Hi, <strong>{username}</strong>
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
            </ListGroup>
          </Col>
          <Col>
            This is your homepage. You can view your favorites, remove them, and
            add more from the homepage.
            {error.message ? (
              <div>
                <hr />
                <p>*** {error.message}</p>
              </div>
            ) : null}
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
      {dataReturned && buttonClicked && current.symbol ? (
        <Container>
          <Row>
            <div style={{ margin: "4rem auto" }}>
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
          </Row>
        </Container>
      ) : null}
      <div>
        {cards ? (
          <div>
            {favoritesList.length ? (
              <p
                onClick={() => {
                  setCards(false);
                  setButtonClicked(false);
                }}
                style={{
                  textDecoration: "underline",
                  margin: "4rem",

                  cursor: "pointer",
                }}
              >
                Hide List
              </p>
            ) : null}

            <div
              style={{
                margin: "4rem",
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-between",
              }}
            >
              {favoritesList.map((e, index) => {
                return (
                  <AccountStocks
                    key={index}
                    id={e.id}
                    name={e.name}
                    symbol={e.symbol}
                  />
                );
              })}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  loggedIn: state.account.loggedIn,
  username: state.account.username,
  favoritesList: state.stocks.favorites,
  current: state.yahoo.quote,
});

const mapDispatchToProps = {
  favGet: allFavorites,
};

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);
