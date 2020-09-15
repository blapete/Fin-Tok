import React, { useState } from "react";
import { connect } from "react-redux";
import { allFavorites } from "../actions/accountStocks";
import { useAuth, useQuote } from "../hooks";
import AccountStocks from "./AccountStocks";
import Navbar from "./Navbar";
import { Card, Container, Row, Col, Spinner, ListGroup } from "react-bootstrap";
//--------------------

//Component
const Homepage = ({
  accountLoggedIn,
  accountStocks,
  accountUsername,
  getAccountStocks,
  yahooQuote,
}) => {
  const [loading, setLoading] = useState(false);
  const [stocksList, setStocksList] = useState(false);
  const [stockListResponse, setStockListResponse] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [notification, setNotification] = useState({
    text: "",
  });
  const auth = useAuth(accountLoggedIn);
  const quote = useQuote(yahooQuote, setStockListResponse);

  const accountStocksRequest = (event) => {
    event.preventDefault();
    setButtonClicked(true);
    if (accountStocks.length) {
      return setStocksList(true);
    } else {
      setLoading(true);
      getAccountStocks({ username: accountUsername }).then((response) => {
        const responseMessage = response.message;
        setTimeout(() => {
          if (responseMessage === "success") {
            setLoading(false);
            setStocksList(true);
          } else if (responseMessage === "you have no favorites") {
            setLoading(false);
            setNotification({
              ...notification,
              text: responseMessage,
            });
          }
        }, [1500]);
      });
    }
  };

  return (
    <div>
      <Navbar status={accountLoggedIn} />
      <Container id="home__Container">
        <Row>
          <h5>
            Hi, <strong>{accountUsername}</strong>
          </h5>
        </Row>
        <br />
      </Container>
      <div style={{ margin: "2rem 2rem" }}>
        <Row>
          <Col xs={6} sm={6} md={6} lg={6} xl={6}>
            <ListGroup>
              <ListGroup.Item action onClick={accountStocksRequest}>
                view my favs
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col>
            This is your homepage. You can view your favorites, remove them, and
            add more from the homepage.
            {notification.text ? (
              <div>
                <hr />
                <p>*** {notification.text}</p>
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
      {stockListResponse && buttonClicked && yahooQuote.symbol ? (
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
                <Card.Header>{yahooQuote.symbol}</Card.Header>
                <Card.Body>
                  <Card.Text>
                    <strong>{yahooQuote.name}</strong>{" "}
                  </Card.Text>
                  <hr />

                  <div>
                    <Card.Text>Currency: {yahooQuote.currency}</Card.Text>
                    <Card.Text>Market Cap: {yahooQuote.marketCap}</Card.Text>
                    <Card.Text>
                      52 week low % change: {yahooQuote.fiftyTwoWeekLow}
                    </Card.Text>
                  </div>
                </Card.Body>
              </Card>
            </div>
          </Row>
        </Container>
      ) : null}
      <div>
        {stocksList ? (
          <div>
            {accountStocks.length ? (
              <p
                onClick={() => {
                  setStocksList(false);
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
              {accountStocks.map((item, index) => {
                return (
                  <AccountStocks
                    key={index}
                    id={item.id}
                    name={item.name}
                    symbol={item.symbol}
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
  accountLoggedIn: state.account.loggedIn,
  accountUsername: state.account.username,
  accountStocks: state.stocks.favorites,
  yahooQuote: state.yahoo.quote,
});

const mapDispatchToProps = {
  getAccountStocks: allFavorites,
};

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);
