const { verifyToken } = require("../utils/token");

const authMiddleware = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      error: "Authorization token is required",
    });
  }

  const payload = verifyToken(token);

  if (!payload) {
    return res.status(401).json({
      error: "Invalid or expired token",
    });
  }

  req.user = {
    id: payload.userId,
  };

  next();
};

module.exports = authMiddleware;
