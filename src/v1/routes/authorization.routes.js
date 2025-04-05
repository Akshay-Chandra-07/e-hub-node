const authorizationController = require("../controllers/authorization.controller");

const authorizationRouter = require("express").Router();

authorizationRouter.post("/login", authorizationController);
authorizationRouter.post("/register", authorizationController);

module.exports = authorizationRouter;
