const router = require("express").Router();
const axios = require("axios");
const { YAHOO_CREDENTIALS } = require("../secrets/yahooCredentials");
const { TOP_STOCKS } = require("../secrets/topStocks");
const { STOCK_QUOTE } = require("../secrets/quotes");

router.post("/quote", (req, res, next) => {
  let symbol = req.body.data;
  axios
    .get(STOCK_QUOTE + symbol, YAHOO_CREDENTIALS)
    .then(function (response) {
      if (!response.data.length) {
        const error = new Error("Invalid symbol");
        throw error;
      }
      console.log("data here here ", response.data);
      if (
        !response.data[0].ask ||
        !response.data[0].longName ||
        !response.data[0].marketCap ||
        !response.data[0].symbol
      ) {
        const error = new Error("No data");
        throw error;
      }
      let data = new Object();
      data.ask = response.data[0].ask;
      data.fiftyTwoWeekLow = response.data[0].fiftyTwoWeekLow;
      data.fiftyTwoWeekHigh = response.data[0].fiftyTwoWeekHigh;
      data.currency = response.data[0].currency;
      data.fullExchangeName = response.data[0].fullExchangeName;
      data.longName = response.data[0].longName;
      data.marketCap = response.data[0].marketCap;
      data.symbol = response.data[0].symbol;
      res.json({ data, message: "Found stock" });
    })
    .catch((error) => {
      console.log("error here", error);
      next(error);
    });
});

router.get("/topstocks", (req, res, next) => {
  axios
    .get(TOP_STOCKS, YAHOO_CREDENTIALS)
    .then(function (response) {
      let filteredArr = [];
      let count = 0;
      for (let i of response.data.quotes) {
        name = new Object();
        name.id = count++;
        name.longName = i.longName;
        name.symbol = i.symbol;
        name.exchange = i.exchange;
        name.marketCap = i.marketCap;
        name.ask = i.ask;
        name.fiftyTwoWeekLowChangePercent = i.fiftyTwoWeekLowChangePercent;
        name.financialCurrency = i.financialCurrency;
        filteredArr.push(name);
      }

      res.json({ message: "success", data: filteredArr });
    })
    .catch((error) => {
      console.log(error);
      next(error);
    });
});

module.exports = router;
