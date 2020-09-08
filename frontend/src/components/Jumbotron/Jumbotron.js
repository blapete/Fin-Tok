import React, { useState } from "react";
import { Container, Row, Jumbotron, Col } from "react-bootstrap";
import { stockQuoteAction } from "../../actions/stock";
import { connect } from "react-redux";
import { Button, FormGroup, FormControl } from "react-bootstrap";
import "./Jumbotron.css";

const Jumbo = ({ quote, date }) => {
  const [stockQuote, setStockQuote] = useState("");

  const updateStockQuote = (event) => {
    setStockQuote(event.target.value);
  };

  const getQuote = (e) => {
    e.preventDefault();
    quote({ data: stockQuote });
  };

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
          <Col>
            <h1>hi</h1>
          </Col>
        </Row>
      </Container>
    </Jumbotron>
  );
};

const mapStateToProps = (state, ownProps) => ({
  message: state.account.message,
  date: ownProps.date,
});

const mapDispatchToProps = {
  quote: stockQuoteAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Jumbo);
