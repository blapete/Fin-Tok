const router = require("express").Router();
const { hash } = require("../account/helper");
const db = require("../models");
const { Op } = require("sequelize");

router.post("/add", (req, res, next) => {
  const { companyName, user } = req.body;
  if (!companyName || !user) {
    const error = new Error("There has been an error with your reauest");
    throw error;
  }
  let username = hash(user);
  db.users
    .findAll({
      where: {
        usernameHash: username,
      },
    })
    .then((res) => {
      let arr = res[0].dataValues.history;
      arr.push(companyName);
      return db.users.update(
        { history: arr },
        {
          where: {
            usernameHash: username,
          },
        }
      );
    })
    .then((res) => {
      console.log("tada", res);
    })
    .catch((e) => {
      console.error("e", e);
    });
  res.send("successfulllllllll");
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
      console.error("e", e);
    });
});

module.exports = router;
