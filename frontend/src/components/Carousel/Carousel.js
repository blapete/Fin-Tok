import React, { useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Card from "./Card";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 4,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const DataCarousel = (props) => {
  const [company, setCompany] = useState([]);

  return (
    <Carousel id="stock__Carousel" responsive={responsive}>
      {props.stocks.map((data) => {
        return (
          <Card
            key={data.id}
            name={data.longName}
            exchange={data.exchange}
            changePercentage={data.fiftyTwoWeekLowChangePercent}
            currency={data.financialCurrency}
            marketCap={data.marketCap}
            symbol={data.symbol}
          />
        );
      })}
    </Carousel>
  );
};

export default DataCarousel;
