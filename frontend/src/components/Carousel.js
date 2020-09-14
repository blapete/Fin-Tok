import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import TopGainers from "./CarouselCard";
//---------------------------------------------------------------------------------
//Component

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
  return (
    <Carousel id="stock__Carousel" responsive={responsive}>
      {props.stocks.map((data) => {
        return (
          <TopGainers
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
