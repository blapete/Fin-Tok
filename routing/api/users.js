const router = require("express").Router();
const { hash } = require("../../account/helper");
const { setSessionCookie } = require("../../util/cookie");
const { v4: uuidv4 } = require("uuid");
const db = require("../../models");
const { Op } = require("sequelize");

router.get("/auth", (req, res) => {
  res.send("gotcha1");
});

router.post("/signup", (req, res, next) => {
  const { username, email, password, confirmPassword } = req.body;
  if (password.length < 6) {
    const error = new Error("Password must be greater than 6 characters");
    error.statusCode = 401;
    throw error;
  }
  if (password !== confirmPassword) {
    const error = new Error("Passwords do not match");
    error.statusCode = 401;
    throw error;
  }
  const sessionId = uuidv4();
  const usernameHash = hash(username);
  const emailHash = hash(email);
  const passwordHash = hash(password);
  db.users
    .findAll({
      where: {
        [Op.or]: [{ usernameHash: usernameHash }, { emailHash: emailHash }],
      },
    })
    .then((data) => {
      if (data.length) {
        let userFound = JSON.parse(JSON.stringify(data, null, 4));
        if (userFound[0].usernameHash === usernameHash) {
          const error = new Error("This username is in use");
          error.statusCode = 409;
          throw error;
        } else if (userFound[0].emailHash === emailHash) {
          const error = new Error("This email is in use");
          error.statusCode = 409;
          throw error;
        }
      } else {
        db.users
          .create({
            usernameHash: usernameHash,
            passwordHash: passwordHash,
            emailHash: emailHash,
          })
          .then(() => {
            db.users
              .findAll({
                where: {
                  usernameHash: usernameHash,
                },
              })
              .then((user) => {
                let userFound = JSON.parse(JSON.stringify(user, null, 4));
                let userId = userFound[0].id;
                db.sessions.create({
                  session_id: sessionId,
                  user_id: userId,
                });
              });

            setSessionCookie({ sessionId, res });
            res.json({ message: "session created" });
          });
      }
    })
    .catch((e) => {
      next(e);
    });
});

module.exports = router;
