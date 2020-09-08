import React from "react";
import Card from "react-bootstrap/Card";

const StockCard = (props) => {
  return (
    <Card>
      <h6>{props.name}</h6>
    </Card>
  );
};

export default StockCard;
