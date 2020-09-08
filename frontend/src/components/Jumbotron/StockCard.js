import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { Card, Button } from "react-bootstrap";

const StockCard = (props) => {
  const [toSignup, setToSignup] = useState(false);
  if (toSignup) {
    return <Redirect to="/signup" />;
  }
  console.log("auth debug1", props);
  const addFav = (e) => {
    e.preventDefault();
    console.log("auth debug2", props);
    if (props.auth) {
      console.log("logged in");
    } else {
      console.log("notttt");
    }
  };
  const nonya = () => {
    console.log("nonya");
  };
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
          onClick={() => {
            return props.auth ? addFav() : setToSignup(true);
          }}
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
