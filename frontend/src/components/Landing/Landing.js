import React, { useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import Moment from "moment";
import "./Landing.css";
import Logout from "../Logout/Logout";

const Landing = () => {
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
  return (
    <div>
      <Navbar />
      <div id="clock">
        <span id="clock__Date">{date}</span>
        <span id="clock__Time">{initialTime}</span>
      </div>
      <h1>Hello world</h1>
      <Logout />
    </div>
  );
};

export default Landing;
