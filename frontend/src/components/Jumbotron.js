import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { quote } from "../actions/yahoo";
import { reset } from "../actions/accountStocks";
import JumbotronInfo from "./JumbotronInfo";
import {
  Button,
  FormGroup,
  FormControl,
  Spinner,
  Container,
  Row,
  Jumbotron,
  Col,
} from "react-bootstrap";
//---------------------------------------------------------------------------------
//Component

const Jumbo = ({
  getQuote,
  date,
  stockResponse,
  resetStockData,
  auth,
  favMessage,
  yahooMessage,
}) => {
  const [stockQuote, setStockQuote] = useState("");
  const [alert, setAlert] = useState(false);
  const [test, setTest] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const [message, setMessage] = useState(false);
  const [error, setError] = useState(false);

  const updateStockQuote = (event) => {
    setStockQuote(event.target.value);
  };

  const getQuoteData = (e) => {
    e.preventDefault();
    if (!stockQuote) {
      return setAlert(!alert);
    }
    if (favMessage !== "") {
      resetStockData();
    }
    setError(false);
    setTest(true);
    setSpinner(true);
    getQuote({ data: stockQuote }).then((data) => {
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
    resetStockData();
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
    } else if (yahooMessage === "Invalid symbol") {
      setTest(false);
      setError(true);
    } else if (yahooMessage === "No data") {
      console.log(favMessage);
      setTest(false);
      setError(true);
    }
  }, [favMessage, stockResponse, yahooMessage]);

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
                  onClick={getQuoteData}
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
            {error ? <p>{favMessage ? favMessage : yahooMessage}</p> : null}
          </Col>
          {test ? (
            <Col>
              {spinner ? (
                <div style={{ margin: "3rem" }}>
                  <Spinner animation="grow" />
                </div>
              ) : (
                <JumbotronInfo
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
  favMessage: state.stocks.message,
  yahooMessage: state.yahoo.message,
  stockResponse: state.yahoo.quote,
  date: ownProps.date,
});

const mapDispatchToProps = {
  getQuote: quote,
  resetStockData: reset,
};

export default connect(mapStateToProps, mapDispatchToProps)(Jumbo);
