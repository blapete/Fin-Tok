const SEPARATOR = "|";
const setSessionCookie = ({ userId, sessionId, res }) => {
  let date = 10 * 60 * 1000;
  const newCookie = `${userId}${SEPARATOR}${sessionId}`;
  //cookie expires every 10 minutes
  res.cookie("sessionString", newCookie, {
    maxAge: date,
    httpOnly: true,
    // secure: true ; use with https
  });
};

module.exports = { setSessionCookie };
