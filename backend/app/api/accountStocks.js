const router = require("express").Router();
const { hash } = require("../account/helper");
const db = require("../../models");

router.post("/add", (req, res, next) => {
  const { stockName, stockSymbol, username } = req.body;
  console.log("reqbody", req.body);
  if (!stockName || !username) {
    const error = new Error("There has been an error with your request");
    throw error;
  }
  let infObject = {
    id: null,
    name: stockName,
    symbol: stockSymbol,
  };
  let user = hash(username);
  db.users
    .findAll({
      where: {
        usernameHash: user,
      },
    })
    .then((res) => {
      console.log("account res:", res);
      let arr;
      console.log("test 1:", res[0].dataValues.history);
      if (res[0].dataValues.history) {
        console.log("test 2:", res[0].dataValues.history);
        let history = res[0].dataValues.history;
        let parsed = history.map((x) => {
          return JSON.parse(x);
        });
        for (let i = 0; i < parsed.length; i++) {
          if (parsed[i].symbol == stockSymbol) {
            const error = new Error("already in favorites");
            throw error;
          }
        }
        arr = res[0].dataValues.history;
        console.log("test 3:", arr);
        if (arr.length !== 0) {
        }
        let lastId = arr.length - 1;
        console.log("test 4:", lastId);
        let tempValue = JSON.parse(arr[lastId]);
        console.log("test 5:", tempValue);
        infObject.id = tempValue.id + 1;
        arr.push(infObject);
      } else {
        infObject.id = 1;
        console.log("test 6:", infObject);
        arr = [infObject];
      }
      return db.users.update(
        { history: arr },
        {
          where: {
            usernameHash: user,
          },
        }
      );
    })
    .then((data) => {
      console.log("data to send for account stocks:", data);
      res.json({ data, message: "added" });
    })
    .catch((error) => {
      console.error("banana", error);
      next(error);
    });
});

router.post("/all", (req, response, next) => {
  const { username } = req.body;
  if (!username) {
    const error = new Error("You are not logged in");
    throw error;
  }
  let user = hash(username);
  db.users
    .findAll({
      where: {
        usernameHash: user,
      },
    })
    .then((res) => {
      console.log("res from data:", res);
      let arr = res[0].dataValues.history;
      if (arr === null) arr = [];
      response.json({
        message: "success",
        favorites: arr,
      });
    })
    .catch((error) => {
      console.error("melon", error);
      next(error);
    });
});

router.delete("/remove/:data", (req, response, next) => {
  const identifier = parseInt(req.params.data.split("|")[0]);
  const user = req.params.data.split("|")[1];
  let username = hash(user);
  db.users
    .findAll({
      where: {
        usernameHash: username,
      },
    })
    .then((data) => {
      let arr;
      arr = data[0].dataValues.history;
      let parsed = arr.map((x) => {
        return JSON.parse(x);
      });
      let filtered = parsed.filter((y) => {
        return y.id !== identifier;
      });
      return db.users.update(
        { history: filtered },
        {
          where: {
            usernameHash: username,
          },
        }
      );
    })
    .then((data) => {
      db.users
        .findAll({
          where: {
            usernameHash: username,
          },
        })
        .then((res) => {
          let arr = res[0].dataValues.history;
          console.log("removed arr:", arr);
          response.json({
            message: "removed item",
            favorites: arr,
          });
        });
    })
    .catch((error) => {
      console.error("lemon", error);
      next(error);
    });
});

module.exports = router;
