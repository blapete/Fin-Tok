import React from "react";
import { connect } from "react-redux";
import { Card, Button } from "react-bootstrap";
import { quote } from "../actions/yahoo";
import { removeFavorite } from "../actions/accountStocks";
//---------------------------------------------------------------------------------
//Component

const AccountStocks = ({ props, stockQuote, removeData, user }) => {
  let symbol = props.symbol;
  const getData = (e) => {
    e.preventDefault();
    stockQuote({ data: symbol }).then((res) => {
      window.scrollTo(0, 0);
    });
  };
  const removeItem = (e) => {
    e.preventDefault();
    removeData({ id: props.id, user });
  };

  return (
    <Card
      key={props.key}
      style={{
        width: "33%",
        border: "1px solid gray",
        flexGrow: "1",
        margin: "4rem",
      }}
      className="mb-2 stock__Cards"
    >
      <Card.Header>{props.name}</Card.Header>

      <Button
        onClick={getData}
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
        onClick={removeItem}
        variant="light"
        style={{
          border: "1px solid rgba(52, 1, 86, 0.5)",
          color: "rgba(52, 1, 86, 0.5)",
        }}
      >
        Remove
      </Button>
    </Card>
  );
};

const mapStateToProps = (state, ownProps) => ({
  user: state.account.username,
  props: ownProps,
});
const mapDispatchToProps = {
  stockQuote: quote,
  removeData: removeFavorite,
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountStocks);
