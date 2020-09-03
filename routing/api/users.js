const router = require("express").Router();
const { hash } = require("../../account/helper");

router.get("/auth", (req, res) => {
  res.send("gotcha1");
});

router.post("/signup", (req, res, next) => {
  const { username, email, password, confirmpassword } = req.body;
  console.log("body", req.body);
  const usernameHash = hash(username);
  const emailHash = hash(email);
  const passwordHash = hash(password);
  console.log("info:", usernameHash, emailHash, passwordHash);
  res.send("gotcha2");

  //ensure that an account doesn't already exist before storing
  //store a created account
  //error code represents a conflict with existing data in the server
});

module.exports = router;
