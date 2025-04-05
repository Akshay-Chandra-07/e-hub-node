const authMiddleware = require("../middleware/auth");
const authorizationRouter = require("./routes/authorization.routes");
const dashboardRouter = require("./routes/dashboard.routes");

const router = require("express").Router();
router.use(authMiddleware)
router.use("/dashboard", dashboardRouter);

module.exports = router;
