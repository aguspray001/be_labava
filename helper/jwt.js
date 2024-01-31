const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  jwtAuthMiddleware: (req, res, next) => {
    const token = req.headers["bb-token"];
    if (token && jwtHandler.verify(token)) {
      req.user = jwtHandler.verify(token);
      next();
    } else {
      res.status(401).json({ message: "Token invalid" });
    }
  },

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
