const { hash } = require("../account/helper");
const db = require("../models");
const authenticatedAccount = ({ id, sessionString }) => {
  let user_id = id;
  console.log("flats", id, sessionString);

  if (!sessionString) {
    const error = new Error("Invalid session");
    // signals a bad request
    error.statusCode = 400;
    throw error;
  } else {
    console.log("here");
    db.sessions
      .findAll({
        where: {
          user_Id: user_id,
        },
      })
      .then((user) => {
        console.log("user session: ", user);
        /* ... */
      })
      .catch((e) => {
        console.log("eeeeeeee:", e);
      });

    // const { username, id } = Session.parse(sessionString);

    // AccountTable.getAccount({ usernameHash: hash(username) })
    //   .then(({ account }) => {
    //     const authenticated = account.sessionId === id;

    //     resolve({ account, authenticated, username });
    //   })
    //   .catch((error) => reject(error));
  }
};

module.exports = { authenticatedAccount };
