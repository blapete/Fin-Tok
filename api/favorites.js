const router = require("express").Router();
const { hash } = require("../account/helper");
const db = require("../models");
const { Op } = require("sequelize");

router.post("/add", (req, res, next) => {
  const { companyName, user } = req.body;
  let username = hash(user);
  let arr = [companyName];
  console.log(username);

  db.users
    .findAll({
      where: {
        usernameHash: username,
      },
    })
    .then((res) => {
      console.log("found one", res);
      db.users.update(
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
  res.send("success");
});

module.exports = router;
