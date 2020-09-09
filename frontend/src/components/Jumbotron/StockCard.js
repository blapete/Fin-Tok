import React, { useState } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import { addFavoriteAction } from "../../actions/favorites";

const StockCard = ({ info, addFav, user }) => {
  const [toSignup, setToSignup] = useState(false);
  let companyName = info.name;
  if (toSignup) {
    return <Redirect to="/signup" />;
  }
  console.log("auth debug1", info);

  // const addFav = (e) => {
  //   e.preventDefault();
  //   console.log("auth debug2", info);
  //   if (info.auth) {
  //     console.log("logged in", info.name);
  //     addFav({
  //       name: info.name,
  //     });

  //     //send create post with favorite (get company name)
  //   } else {
  //     console.log("notttt");
  //     //"you must be signed in"
  //   }
  // };

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
              ? addFav({ companyName, user })
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
  auth: state.account.loggedIn,
  user: state.account.username,
  info: owninfo,
});

const mapDispatchToinfo = {
  addFav: addFavoriteAction,
};

export default connect(mapStateToinfo, mapDispatchToinfo)(StockCard);
