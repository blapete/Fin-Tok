import React, { useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Card from "./Card";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 2,
  },
};

const DataCarousel = (props) => {
  const [company, setCompany] = useState([]);

  return (
    <Carousel responsive={responsive}>
      {props.stocks.map((data) => {
        return <Card key={data.id} name={data.longName} />;
      })}
    </Carousel>
  );
};

export default DataCarousel;
