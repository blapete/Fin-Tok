import React, { useState, useEffect } from "react";
import { Container, Row, Jumbotron, Col } from "react-bootstrap";
import { stockQuoteAction } from "../../actions/stock";
import Card from "./StockCard";
import { connect } from "react-redux";
import { Button, FormGroup, FormControl } from "react-bootstrap";
import "./Jumbotron.css";

const Jumbo = ({ quote, date, stockResponse }) => {
  const [stockQuote, setStockQuote] = useState("");
  const [showCard, setShowCard] = useState(false);

  const updateStockQuote = (event) => {
    setStockQuote(event.target.value);
  };

  const getQuote = (e) => {
    e.preventDefault();
    quote({ data: stockQuote });
  };

  // useEffect(() => {
  //   console.log("DEBUGGER", stockResponse);
  //   console.log("DEBUGGER2", stockResponse);
  //   if (stockResponse.ask) {
  //     console.log("yes");
  //   } else {
  //     console.log("no");
  //   }
  //   setShowCard(true);
  // }, [stockResponse]);

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
                    placeholder="symbol"
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
          </Col>
          {stockResponse.ask ? (
            <Col>
              <Card name={stockResponse.longName} />
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
  message: state.account.message,
  date: ownProps.date,
  stockResponse: state.stocks.stock_quote,
});

const mapDispatchToProps = {
  quote: stockQuoteAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Jumbo);
