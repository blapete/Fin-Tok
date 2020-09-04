const setSessionCookie = ({ sessionId, res }) => {
  let date = 10 * 60 * 1000;
  //cookie expires every 10 minutes
  res.cookie("sessionString", sessionId, {
    maxAge: date,
    httpOnly: true,
    // secure: true ; use with https
  });
};

module.exports = { setSessionCookie };
