const bcryptService = require("../../utils/bcrypt");
const authorizationService = require("../services/authorization.service");
const { createToken } = require("../../utils/token");
const userLoginSchema = require("../validations/userLoginValidation");
const userRegistrationSchema = require("../validations/userRegistrationValidation");

class AuthorizationController {
  async registerUser(req, res) {
    let message;
    let success;
    try {
      const payload = req.body;
      const { error } = userRegistrationSchema.validate(payload);

      if (!error) {
        const user = await authorizationService.validateEmail(
          req,
          payload.email
        );
        if (!user.length) {
          payload.hashedPassword = await bcryptService.hashPassword(
            payload.password
          );
          await authorizationService.createUser(req, payload);
          message = "User registered successfully";
          success = true;
        } else {
          message = "Email already registered";
          success = false;
        }
      } else {
        message = error.message;
        success = false;
      }
    } catch (error) {
      console.log("Registration error:", error);
      message = "User registration failed! Please try again";
      success = false;
    }

    return res.json({
      message,
      success,
      status: success ? 200 : 400,
    });
  }

  async loginUser(req, res) {
    let data = {};
    let message;
    let success;
    try {
      const payload = req.body;
      const { error } = userLoginSchema.validate(payload);
      if (!error) {
        const user = await authorizationService.validateEmail(
          req,
          payload.email
        );
        if (user.length) {
          const isValidPassword = await bcryptService.comparePassword(
            payload.password,
            user[0].password
          );
          if (isValidPassword) {
            data.token = await createToken({ user_id: user[0].id });
            message = "Login successful";
            success = true;
          } else {
            message = "Invalid password";
            success = false;
          }
        } else {
          message = "Invalid credentials";
          success = false;
        }
      } else {
        message = error.message;
        success = false;
      }
    } catch (error) {
      console.log("Login error:", error);
      message = "Error in user login";
      success = false;
    }

    return res.json({
      data,
      message,
      success,
      status: success ? 200 : 400,
    });
  }
}

module.exports = new AuthorizationController();
