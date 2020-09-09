const router = require("express").Router();
const AccountTable = require("../account/table");
const Session = require("../account/session");
const { hash } = require("../account/helper");
const { setSession, authenticatedAccount } = require("./helper");

router.post("/signup", (req, response, next) => {
  const { username, email, password, confirmPassword } = req.body;

  if (!username || !email || !password || !confirmPassword) {
    const error = new Error("Please fill out all fields");
    throw error;
  }

  const emailTest = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (email) {
    if (!emailTest.test(email)) {
      const error = new Error("Invalid email format");
      throw error;
    }
  }

  if (password.length < 6) {
    const error = new Error("Password must be greater than 6 characters");
    throw error;
  }
  if (password !== confirmPassword) {
    const error = new Error("Passwords do not match");
    throw error;
  }

  const usernameHash = hash(username);
  const emailHash = hash(email);
  const passwordHash = hash(password);

  AccountTable.getAccount({ usernameHash, emailHash })
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
        return AccountTable.storeAccount({
          usernameHash,
          emailHash,
          passwordHash,
        });
      }
    })
    .then(() => {
      return setSession({ username, response });
    })
    .then(({ message }) => {
      response.json({ message });
    })
    .catch((error) => next(error));
});

router.get("/auth", (req, res, next) => {
  authenticatedAccount({ sessionString: req.cookies.sessionString })
    .then(({ authenticated, username }) => {
      res.json({ authenticated, username });
    })
    .catch((error) => {
      next(error);
    });
});

router.post("/login", (req, response, next) => {
  const { username, password } = req.body;
  console.log(username, password, "iiii");
  if (!username || !password) {
    const error = new Error("Please fill both fields");
    error.statusCode = 401;
    throw error;
  }
  AccountTable.getAccount({ usernameHash: hash(username) })
    .then((account) => {
      if (account && account.passwordHash === hash(password)) {
        const { session_id } = account;
        return setSession({ username, response, session_id });
      } else {
        const error = new Error("Incorrect username/password");
        error.statusCode = 409;
        throw error;
      }
    })
    .then((re) => {
      response.json(re);
    })
    .catch((error) => next(error));
});

router.get("/logout", (req, res, next) => {
  const { username } = Session.parse(req.cookies.sessionString);
  AccountTable.updateSessionId({
    sessionId: null,
    usernameHash: hash(username),
  })
    .then(() => {
      res.clearCookie("sessionString");
      res.json({ message: "Successful logout" });
    })
    .catch((error) => next(error));
});

module.exports = router;
