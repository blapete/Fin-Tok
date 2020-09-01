import React from "react";
import Moment from "moment";
import "./Clock.css";

const Clock = () => {
  //   let test = new Date();
  //   console.log("date", test.toDateString());
  //   console.log("hrs", test.getHours());
  //   console.log("min", test.getMinutes());
  //   console.log("sec", test.getSeconds());
  let date = Moment().format("MMMM Do YYYY");
  let initialTime = Moment().format("h:mm:ss a");
  const updateTime = () => {
    const time = document.getElementById("clock__Time");
    const date = document.getElementById("clock__Date");
    const now = Moment();
    const ticking = now.format("h:mm:ss a");
    const currentDate = now.format("MMMM Do YYYY");
    // console.log(ticking);
    time.innerHTML = ticking;
    date.innerHTML = currentDate;
  };
  setInterval(updateTime, 1000);

  return (
    <div id="clock">
      <span id="clock__Date">{date}</span>
      <span id="clock__Time">{initialTime}</span>
    </div>
  );
};

export default Clock;
