require("dotenv").config();
const express = require("express");
const cors = require("cors");
const multitenancyMiddleware = require("./middleware/multitenancy");
const authMiddleware = require("./middleware/auth");
const database = require("./config/database");
const router = require("./v1/router");
const app = express();
const PORT = process.env.PORT || 3000;

// middleware
app.use(express.json());
app.use(cors());
app.use(multitenancyMiddleware);
app.use(database.mysqlConnectionMiddleware);
app.use(authMiddleware);

//routes
app.use("/v1", router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
