import React, { useState, useEffect } from "react";
import { Container, Row, Jumbotron, Col } from "react-bootstrap";
import { stockQuoteAction, resetAction } from "../../actions/stock";
import Card from "./StockCard";
import { connect } from "react-redux";
import { Button, FormGroup, FormControl, Spinner } from "react-bootstrap";
import "./Jumbotron.css";

const Jumbo = ({ quote, date, stockResponse, reset, auth, favMessage }) => {
  const [stockQuote, setStockQuote] = useState("");
  const [showCard, setShowCard] = useState(false);
  const [alert, setAlert] = useState(false);
  const [test, setTest] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const [message, setMessage] = useState(false);
  const [error, setError] = useState(false);

  const updateStockQuote = (event) => {
    setStockQuote(event.target.value);
  };

  const getQuote = (e) => {
    e.preventDefault();
    if (!stockQuote) {
      return setAlert(!alert);
    }
    if (favMessage !== "") {
      reset();
    }
    setError(false);
    setTest(true);
    setSpinner(true);
    quote({ data: stockQuote }).then((data) => {
      setTimeout(() => {
        if (data.type === "STOCK_INFO_REQUEST_QUOTE_SUCCESS") {
          setSpinner(false);
        }
      }, 2000);
    });
  };

  const reSet = (e) => {
    e.preventDefault();
    if (error) {
      setError(false);
    }
    reset();
    setTest(false);
    setStockQuote("");
  };

  useEffect(() => {
    if (favMessage === "Already in your favorites") {
      setError(true);
    } else if (favMessage === "added to favorites") {
      setError(true);
      setTest(false);
      setStockQuote("");
    } else if (favMessage === "Invalid symbol") {
      setTest(false);
      setError(true);
    } else if (favMessage === "No data") {
      console.log(favMessage);
      setTest(false);
      setError(true);
    }
  }, [favMessage, stockResponse]);

  return (
    <Jumbotron>
      <Container>
        <Row>
          <Col>
            <h5>{date}</h5>
            <hr
              style={{
                border: "0",
                clear: "both",
                width: "65%",
                height: "1px",
                backgroundColor: "black",
              }}
            />
            <div id="search__Box">
              <span>
                <FormGroup>
                  <FormControl
                    type="text"
                    value={stockQuote}
                    placeholder="symbol ex: AAPL"
                    onChange={updateStockQuote}
                  />
                </FormGroup>
              </span>
              <span>
                <Button
                  variant="light"
                  style={{
                    border: "1px solid rgba(52, 1, 86, 0.5)",
                    color: "rgba(52, 1, 86, 0.9)",
                  }}
                  onClick={getQuote}
                >
                  Search
                </Button>
              </span>
            </div>
            {alert ? <p>* field required</p> : null}
            <br />
            <br />
            {stockResponse.ask && stockQuote && !spinner && test ? (
              <p
                style={{ cursor: "pointer", textDecoration: "underline" }}
                onClick={reSet}
              >
                clear search
              </p>
            ) : null}
            <br />
            {error ? <p>{favMessage}</p> : null}
          </Col>
          {test ? (
            <Col>
              {spinner ? (
                <div style={{ margin: "3rem" }}>
                  <Spinner animation="grow" />
                </div>
              ) : (
                <Card
                  auth={auth}
                  name={stockResponse.longName}
                  ask={stockResponse.ask}
                  currency={stockResponse.currency}
                  symbol={stockResponse.symbol}
                  cap={stockResponse.marketCap}
                />
              )}
            </Col>
          ) : (
            <div></div>
          )}
        </Row>
        {message ? (
          <Row>
            <Col>added to favorites</Col>
          </Row>
        ) : null}
      </Container>
    </Jumbotron>
  );
};

const mapStateToProps = (state, ownProps) => ({
  auth: state.account.loggedIn,
  message: state.account.message,
  favMessage: state.stocks.message,
  date: ownProps.date,
  stockResponse: state.stocks.stock_quote,
});

const mapDispatchToProps = {
  quote: stockQuoteAction,
  reset: resetAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Jumbo);
