const knex = require("knex");

class Database {
  getKnexInstance(dbName) {
    return knex({
      client: "mysql2",
      connection: {
        host: process.env.DB_HOST || "localhost",
        user: process.env.DB_USER || "root",
        password: process.env.DB_PASSWORD || "",
        database: dbName,
        port: process.env.DB_PORT || 3306,
      },
      pool: {
        min: 2,
        max: 10,
      },
    });
  }

  mysqlConnectionMiddleware = (req, res, next) => {
    try {
      if (!req.db) {
        throw new Error("Database name not found");
      }
      req.knex = this.getKnexInstance(req.db);
      next();
    } catch (error) {
      console.error("Database connection error:", error);
      return res.status(500).json({
        error: "Failed to initialize database connection",
      });
    }
  };
}

module.exports = new Database();
