require("dotenv").config();
const express = require("express");
const cors = require("cors");
const multitenancyMiddleware = require("./middleware/multitenancy");
const authMiddleware = require("./middleware/auth");
const database = require("./config/database");
const router = require("./v1/router");
const authorizationRouter = require("./v1/routes/authorization.routes");
const { loggerMiddleware, Logger } = require("./middleware/logger");
const app = express();
const PORT = process.env.PORT || 3000;

// Initialize logger
const logger = Logger.getInstance();

// middleware
app.use(express.json());
app.use(cors());
app.use(loggerMiddleware);
app.use(multitenancyMiddleware);
app.use(database.mysqlConnectionMiddleware);
// app.use(authMiddleware);

//routes
app.use("/v1/auth", authorizationRouter);
app.use("/v1", router);

app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});
