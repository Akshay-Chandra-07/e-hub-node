const {
  REGISTRATION_EMAIL_VALIDATION_QUERY,
  USER_REGISTRATION_QUERY,
} = require("../constants/queries");

class AuthorizationService {
  // Check if email already exists in db
  async validateEmail(req, email) {
    try {
      const user = await req.knex.raw(REGISTRATION_EMAIL_VALIDATION_QUERY, [
        email,
      ]);
      return user[0];
    } catch (error) {
      throw error;
    }
  }

  async createUser(req, payload) {
    try {
      return await req.knex.raw(USER_REGISTRATION_QUERY, [
        payload.username,
        payload.email,
        payload.hashedPassword,
      ]);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new AuthorizationService();
