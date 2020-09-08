import React from "react";
import { Card, Button } from "react-bootstrap";

const StockCard = (props) => {
  return (
    <Card>
      <Card.Header>{props.symbol}</Card.Header>
      <Card.Body>
        <Card.Text>
          <strong>{props.name}</strong>{" "}
        </Card.Text>
        <hr />

        <div>
          <Card.Text>currency: {props.currency}</Card.Text>
          <Card.Text>cap: {props.cap}</Card.Text>
          <Card.Text>price: {props.ask}</Card.Text>
        </div>
      </Card.Body>
      <Card.Footer className="text-muted">
        <Button
          variant="light"
          style={{
            border: "1px solid rgba(52, 1, 86, 0.5)",
            color: "rgba(52, 1, 86, 0.9)",
          }}
        >
          Add to favorites
        </Button>
      </Card.Footer>
    </Card>
  );
};

export default StockCard;
