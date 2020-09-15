import React from "react";
import { Card } from "react-bootstrap";
//--------------------

//Component
const TopGainers = (props) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "stretch",
        padding: "2rem",
        height: "100%",
      }}
    >
      <Card
        className="mb-2"
        style={{
          width: "18rem",
          position: "relative",
        }}
      >
        <Card.Header>{props.symbol}</Card.Header>
        <Card.Body>
          <Card.Text>
            <strong>{props.name}</strong>{" "}
          </Card.Text>
          <hr />

          <div>
            <Card.Text>Exchange: {props.exchange}</Card.Text>
            <Card.Text>Currency: {props.currency}</Card.Text>
            <Card.Text>Market Cap: {props.marketCap}</Card.Text>
            <Card.Text>
              52 week low % change: {props.changePercentage}
            </Card.Text>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default TopGainers;
