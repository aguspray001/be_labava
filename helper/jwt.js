const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  sign: (payload) => {
    return jwt.sign(payload, process.env.TOKEN_SECRET);
  },

  verify: (token) => {
    try {
      return jwt.verify(token, process.env.TOKEN_SECRET);
    } catch (e) {
      return false;
    }
  },

  decode: (token) => {
    return jwt.decode(token, { complete: true });
  },
};
