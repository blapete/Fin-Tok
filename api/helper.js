const Session = require("../account/session");
const { hash } = require("../account/helper");
const AccountTable = require("../account/table");

const setSession = ({ username, response, session_id }) => {
  return new Promise((resolve, reject) => {
    let session, sessionString;
    if (session_id) {
      sessionString = Session.sessionString({ username, id: session_id });
      setSessionCookie({ sessionString, response });
      resolve({ message: "session restored", username: username });
    } else {
      session = new Session({ username });
      sessionString = session.toString();
      AccountTable.updateSessionId({
        sessionId: session.id,
        usernameHash: hash(username),
      })
        .then(() => {
          setSessionCookie({ sessionString, response });
          resolve({ message: "session created", username });
        })
        .catch((error) => reject(error));
    }
  });
};
const setSessionCookie = ({ sessionString, response }) => {
  let date = 10 * 60 * 1000;
  //cookie expires every 10 minutes
  response.cookie("sessionString", sessionString, {
    maxAge: date,
    httpOnly: true,
    // secure: true ;
  });
};

const authenticatedAccount = ({ sessionString }) => {
  return new Promise((resolve, reject) => {
    if (!sessionString || !Session.verify(sessionString)) {
      let err = new Error("Invalid session");
      err.statusCode = 401;
      return reject(err);
    } else {
      const { username, id } = Session.parse(sessionString);
      AccountTable.getAccount({ usernameHash: hash(username) })
        .then((data) => {
          const authenticated = data.session_id === id;
          resolve({ data, authenticated, username });
        })
        .catch((error) => reject(error));
    }
  });
};

module.exports = { setSession, authenticatedAccount };
