import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { stockQuoteAction, topStockAction } from "../../actions/stock";
import { Button } from "react-bootstrap";
import Jumbotron from "../Jumbotron/Jumbotron";

import Carousel from "../Carousel/Carousel";
import Navbar from "../Navbar/Navbar";
import Moment from "moment";
import "./Landing.css";

const Landing = ({ loggedIn, stockQuote, topStocks, stocks }) => {
  const [show25, setShow25] = useState(false);
  let date = Moment().format("MMMM Do YYYY");
  let initialTime = Moment().format("h:mm:ss a");
  const updateTime = () => {
    const time = document.getElementById("clock__Time");
    // const date = document.getElementById("clock__Date");
    const now = Moment();
    const ticking = now.format("h:mm:ss a");
    const currentDate = now.format("MMMM Do YYYY");
    time.innerHTML = ticking;
    // date.innerHTML = currentDate;
  };

  useEffect(() => {
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // useEffect(() => {
  //   async function getStocks() {
  //     const resp = await topStocks();
  //     console.log("resp", resp);
  //   }
  //   getStocks();
  // }, []);

  const sendRequest = async (e) => {
    e.preventDefault();
    const thing = await stockQuote();
    console.log("thing", thing);
  };
  return (
    <div style={{ height: "100%" }}>
      <Navbar status={loggedIn} />
      <div id="clock">
        {/* <h4 id="clock__Date">{date}</h4> */}
        <span id="clock__Time">{initialTime}</span>
      </div>
      <Jumbotron date={date} />
      <div id="stock__Box">
        <Button
          style={{
            backgroundColor: "rgba(52, 1, 86, 0.5)",
            border: "1px solid white",
          }}
          id="stock__Button"
          onClick={() => {
            console.log("touched");
            setShow25(!show25);
          }}
        >
          Top watched
        </Button>
      </div>

      {show25 ? <Carousel stocks={stocks} /> : null}
    </div>
  );
};

const mapStateToProps = (state) => ({
  loggedIn: state.account.loggedIn,
  stocks: state.stocks.top_stocks,
});

const mapDispatchToProps = {
  stockQuote: stockQuoteAction,
  topStocks: topStockAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
