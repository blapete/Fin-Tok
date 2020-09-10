import React from "react";
import { connect } from "react-redux";
import { Card, Button } from "react-bootstrap";
import { stockQuoteAction } from "../../actions/stock";

const Cards = ({ props, stockQuote }) => {
  const getData = (e) => {
    e.preventDefault();
    console.log("getdata::");
    // stockQuote();
  };
  return (
    <Card
      key={props.key}
      style={{
        width: "18rem",
        border: "1px solid gray",
      }}
      className="mb-2 stock__Cards"
    >
      <Card.Header>{props.name}</Card.Header>

      <Button
        style={{
          marginBottom: "0.5rem",
          backgroundColor: "rgba(52, 1, 86, 0.5)",
          border: "1px solid rgba(52, 1, 86, 0.5)",
        }}
      >
        View
      </Button>
      <p>or</p>
      <Button
        variant="light"
        style={{
          border: "1px solid rgba(52, 1, 86, 0.5)",
          color: "rgba(52, 1, 86, 0.5)",
        }}
        onClick={getData}
      >
        Remove
      </Button>
    </Card>
  );
};

const mapStateToProps = (state, ownProps) => ({
  loggedIn: state.account.loggedIn,
  list: state.stocks.favorites,
  props: ownProps,
});
const mapDispatchToProps = {
  stockQuote: stockQuoteAction,
};

export default connect(mapStateToProps, null)(Cards);
