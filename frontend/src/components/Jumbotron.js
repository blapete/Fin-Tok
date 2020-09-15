import React, { useState } from "react";
import { connect } from "react-redux";
import { quote } from "../actions/yahoo";
import { reset } from "../actions/accountStocks";
import JumbotronInfo from "./JumbotronInfo";
import { useResponse } from "../hooks";
import { YAHOO } from "../actions/types";
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
//--------------------

//Component
const Jumbo = ({
  accountLoggedIn,
  accountStocksMessage,
  date,
  getQuote,
  clearStockInfo,
  yahooMessage,
  yahooQuote,
}) => {
  const [quote, setQuote] = useState("");
  const [notification, setNotification] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [response, setResponse] = useState(false);
  const [loading, setLoading] = useState(false);

  const updateStockQuote = (event) => {
    setQuote(event.target.value);
  };

  const getQuoteData = (e) => {
    e.preventDefault();
    if (!quote) {
      return setNotification(!notification);
    }
    if (accountStocksMessage !== "") {
      clearStockInfo();
    }
    //
    setResponse(false);
    setButtonClicked(true);
    setLoading(true);
    //
    getQuote({ data: quote }).then((data) => {
      setTimeout(() => {
        if (data.type === YAHOO.REQUEST_QUOTE_SUCCESS) {
          setLoading(false);
        }
      }, 2000);
    });
  };

  const clearSearchInput = (e) => {
    e.preventDefault();
    if (response) {
      setResponse(false);
    }
    clearStockInfo();
    setButtonClicked(false);
    setQuote("");
  };

  useResponse(
    setResponse,
    setButtonClicked,
    setQuote,
    accountStocksMessage,
    yahooMessage,
    yahooQuote
  );

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
                    value={quote}
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
            {notification ? <p>* field required</p> : null}
            <br />
            {buttonClicked && quote && !loading && yahooQuote.symbol ? (
              <p
                style={{ cursor: "pointer", textDecoration: "underline" }}
                onClick={clearSearchInput}
              >
                clear search
              </p>
            ) : null}
            <br />
            {response ? (
              <p>
                {accountStocksMessage ? accountStocksMessage : yahooMessage}
              </p>
            ) : null}
          </Col>
          {buttonClicked ? (
            <Col>
              {loading ? (
                <div style={{ margin: "3rem" }}>
                  <Spinner animation="grow" />
                </div>
              ) : (
                <JumbotronInfo
                  auth={accountLoggedIn}
                  name={yahooQuote.longName}
                  ask={yahooQuote.ask}
                  currency={yahooQuote.currency}
                  symbol={yahooQuote.symbol}
                  cap={yahooQuote.marketCap}
                />
              )}
            </Col>
          ) : (
            <div></div>
          )}
        </Row>
      </Container>
    </Jumbotron>
  );
};

const mapStateToProps = (state, ownProps) => ({
  accountLoggedIn: state.account.loggedIn,
  accountStocksMessage: state.stocks.message,
  yahooMessage: state.yahoo.message,
  yahooQuote: state.yahoo.quote,
  date: ownProps.date,
});

const mapDispatchToProps = {
  getQuote: quote,
  clearStockInfo: reset,
};

export default connect(mapStateToProps, mapDispatchToProps)(Jumbo);
