import React, { useEffect } from "react";
import { connect } from "react-redux";
import { stockQuoteAction, topStockAction } from "../../actions/stock";
import Navbar from "../Navbar/Navbar";
import Moment from "moment";
import "./Landing.css";

const Landing = ({ loggedIn, stockQuote, topStocks }) => {
  let date = Moment().format("MMMM Do YYYY");
  let initialTime = Moment().format("h:mm:ss a");
  const updateTime = () => {
    const time = document.getElementById("clock__Time");
    const date = document.getElementById("clock__Date");
    const now = Moment();
    const ticking = now.format("h:mm:ss a");
    const currentDate = now.format("MMMM Do YYYY");
    time.innerHTML = ticking;
    date.innerHTML = currentDate;
  };

  useEffect(() => {
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // useEffect(() => {
  //   async function getStocks() {
  //     const resp = await topStocks;
  //     console.log('resp', resp)
  //   }
  //   getStocks();
  // }, []);

  const sendRequest = async (e) => {
    e.preventDefault();
    const thing = await stockQuote();
    console.log("thing", thing);
  };
  return (
    <div>
      <Navbar status={loggedIn} />
      <div id="clock">
        <span id="clock__Date">{date}</span>
        <span id="clock__Time">{initialTime}</span>
      </div>
      <h1>Hello world</h1>
      <button onClick={sendRequest}>click me</button>
    </div>
  );
};

const mapStateToProps = (state) => ({
  loggedIn: state.account.loggedIn,
});

const mapDispatchToProps = {
  stockQuote: stockQuoteAction,
  topStocks: topStockAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
