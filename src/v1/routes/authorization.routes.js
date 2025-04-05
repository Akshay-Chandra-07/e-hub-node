const authorizationController = require("../controllers/authorization.controller");

const authorizationRouter = require("express").Router();

authorizationRouter.post("/login", authorizationController.loginUser);
authorizationRouter.post("/register", authorizationController.registerUser);

module.exports = authorizationRouter;
