const multitenancyMiddleware = (req, res, next) => {
  const dbName = req.headers.database;

  if (!database) {
    return res.status(400).json({
      error: "Database connection failed",
    });
  }
  req.db = dbName;
  next();
};

module.exports = multitenancyMiddleware;
