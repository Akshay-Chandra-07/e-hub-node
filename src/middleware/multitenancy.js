const multitenancyMiddleware = (req, res, next) => {
  const dbName = req.headers.database;

  if (!dbName) {
    return res.status(400).json({
      error: "Database name is required in headers",
    });
  }

  req.db = dbName;
  next();
};

module.exports = multitenancyMiddleware;
