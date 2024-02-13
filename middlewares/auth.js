const { verify } = require("../helper/jwt");

module.exports = {
    jwtAuthMiddleware: (req, res, next) => {
      const token = req.headers["bb-token"];
      if (token && verify(token)) {
        req.user = verify(token);
        next();
      } else {
        res.status(401).json({ message: "Token invalid" });
      }
    },
}