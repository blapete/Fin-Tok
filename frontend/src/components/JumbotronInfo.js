import React, { useState } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import { addFavorite } from "../actions/accountStocks";
//---------------------------------------------------------------------------------
//Component

const JumbotronInfo = ({ addFav, info, user }) => {
  const flag = true;
  const [toSignup, setToSignup] = useState(false);
  let companyName = info.name;
  if (toSignup) {
    return <Redirect to="/signup" />;
  }

  let symbol = info.symbol;

  return (
    <Card>
      <Card.Header>{info.symbol}</Card.Header>
      <Card.Body>
        <Card.Text>
          <strong>{info.name}</strong>{" "}
        </Card.Text>
        <hr />

        <div>
          <Card.Text>currency: {info.currency}</Card.Text>
          <Card.Text>cap: {info.cap}</Card.Text>
          <Card.Text>price: {info.ask}</Card.Text>
        </div>
      </Card.Body>
      <Card.Footer className="text-muted">
        <Button
          onClick={() => {
            return info.auth
              ? addFav({ companyName, user, symbol, flag })
              : setToSignup(true);
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

const mapStateToinfo = (state, owninfo) => ({
  user: state.account.username,
  info: owninfo,
});

const mapDispatchToinfo = {
  addFav: addFavorite,
};

export default connect(mapStateToinfo, mapDispatchToinfo)(JumbotronInfo);
