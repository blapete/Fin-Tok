import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { stockQuoteAction, topStockAction } from "../../actions/stock";
import { Button, Container, Row, Spinner } from "react-bootstrap";
import Jumbotron from "../Jumbotron/Jumbotron";
import Modal from "../Modal/Modal";
import Carousel from "../Carousel/Carousel";
import Navbar from "../Navbar/Navbar";
import Moment from "moment";
import "./Landing.css";

const Landing = ({ loggedIn, stockQuote, topStocks, stocks }) => {
  const [show25, setShow25] = useState(false);
  const [waiting, setWaiting] = useState(false);
  let date = Moment().format("MMMM Do YYYY");
  let initialTime = Moment().format("h:mm:ss a");
  const updateTime = () => {
    const time = document.getElementById("clock__Time");
    const now = Moment();
    const ticking = now.format("h:mm:ss a");
    const currentDate = now.format("MMMM Do YYYY");
    time.innerHTML = ticking;
  };

  const getAll = () => {
    if (waiting === true) {
      return setWaiting(false);
    }
    if (stocks.length) {
      setWaiting(true);
      setShow25(true);
      return;
    }
    setWaiting(true);
    topStocks().then((res) => {
      console.log("all res", res);
      if (res.type === "STOCK_INFO_REQUEST_TOPSTOCKS_SUCCESS") {
        setShow25(!show25);
      } else {
        setWaiting(false);
      }
    });
  };

  useEffect(() => {
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const sendRequest = async (e) => {
    e.preventDefault();
    const thing = await stockQuote();
  };
  return (
    <div style={{ height: "100%" }}>
      <Navbar status={loggedIn} />
      <div id="clock">
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
          onClick={getAll}
        >
          Top watched
        </Button>
        <Modal />
      </div>
      {waiting ? (
        <div>
          {show25 ? (
            <Carousel stocks={stocks} />
          ) : (
            <Container style={{ marginTop: "5rem" }}>
              <Row>
                <div style={{ margin: "0 auto" }}>
                  <div className="divider"></div>

                  <Spinner
                    animation="border"
                    role="status"
                    style={{ margin: "1rem" }}
                  >
                    <span className="sr-only">Loading...</span>
                  </Spinner>

                  <div className="divider"></div>
                </div>
              </Row>
            </Container>
          )}
        </div>
      ) : null}
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
