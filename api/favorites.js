const router = require("express").Router();
const { hash } = require("../account/helper");
const db = require("../models");
const { Op } = require("sequelize");

router.post("/add", (req, res, next) => {
  const { companyName, user, symbol } = req.body;
  console.log("stuffffffffffffffffffffffffff", companyName, user, symbol);
  if (!companyName || !user) {
    const error = new Error("There has been an error with your request");
    throw error;
  }
  let infObject = {
    id: null,
    name: companyName,
    symbol: symbol,
  };
  let username = hash(user);
  db.users
    .findAll({
      where: {
        usernameHash: username,
      },
    })
    .then((res) => {
      let arr;
      if (res[0].dataValues.history.length) {
        let history = res[0].dataValues.history;
        let parsed = history.map((x) => {
          return JSON.parse(x);
        });
        for (let i = 0; i < parsed.length; i++) {
          if (parsed[i].symbol == symbol) {
            const error = new Error("Already in your favorites");
            throw error;
          }
        }
        console.log("2:", res[0].dataValues.history);
        arr = res[0].dataValues.history;
        let lastId = arr.length - 1;
        let tempValue = JSON.parse(arr[lastId]);
        infObject.id = tempValue.id + 1;
        arr.push(infObject);
      } else {
        infObject.id = 1;
        arr = [infObject];
        console.log("3:", arr);
      }
      return db.users.update(
        { history: arr },
        {
          where: {
            usernameHash: username,
          },
        }
      );
    })
    .then((data) => {
      console.log("5:", data);
      res.json({ data, message: "added to favorites" });
    })
    .catch((e) => {
      console.error("4:", e);
      next(e);
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
      let arr = res[0].dataValues.history;
      response.json({
        message: "success - favorites found",
        favorites: arr,
      });
    })
    .catch((e) => {
      next(e);
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
      console.log("data", data);
      db.users
        .findAll({
          where: {
            usernameHash: username,
          },
        })
        .then((res) => {
          let arr = res[0].dataValues.history;
          response.json({
            message: "removed item",
            favorites: arr,
          });
        });
    })
    .catch((error) => {
      console.erre(error);
      next(error);
    });
});

module.exports = router;
