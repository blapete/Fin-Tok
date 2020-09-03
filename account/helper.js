const SHA256 = require("crypto-js/sha256");
const { APP_SECRET } = require("../secrets");

// custom hash method to add to SHA256, makes our hash even more secure
const hash = (string) => {
  return SHA256(`${APP_SECRET}${string}${APP_SECRET}`).toString();
};

module.exports = { hash };
