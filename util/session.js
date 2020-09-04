const db = require("../models");

const sessionMiddleware = (req, res, next) => {
  const sessionId = req.cookies.sessionString;
  if (!sessionId) {
    return res.status(401).json({ error: "No session ID provided" });
  }

  db.sessions
    .findAll({
      where: { session_id: sessionId },
      include: [
        {
          model: User,
          where: { session_id: sessionId },
        },
      ],
    })
    .then((res) => {
      console.log("responseee", res);
      // if (!user) {
      //   return res
      //     .status(401)
      //     .json({ error: "Session ID does not match any valid sessions" });
      // }
      // req.user = user;
      // next();
    });
};

module.exports = { sessionMiddleware };
