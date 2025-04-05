const authorizationRouter = require("./routes/authorization.routes");

const router = require("express").Router();

router.use("/auth", authorizationRouter);

module.exports = router;
