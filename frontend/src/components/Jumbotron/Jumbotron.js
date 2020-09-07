import React, { useState } from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
import { Button, FormGroup, FormControl } from "react-bootstrap";
import "./Jumbotron.css";

const Jumbo = (props) => {
  const [stockQuote, setStockQuote] = useState("");

  const updateStockQuote = (event) => {
    setStockQuote(event.target.value);
    console.log("here", stockQuote);
  };

  return (
    <Jumbotron>
      <h5>{props.date}</h5>
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
          >
            Search
          </Button>
        </span>
      </div>
    </Jumbotron>
  );
};

export default Jumbo;
