const bcrypt = require("bcrypt");

class BcryptService {
  async hashPassword(password) {
    try {
      const hash = await bcrypt.hash(password, 10);
      return hash;
    } catch (error) {
      throw new Error("Error hashing password");
    }
  }

  async comparePassword(password, hash) {
    try {
      const match = await bcrypt.compare(password, hash);
      return match;
    } catch (error) {
      throw new Error("Error comparing passwords");
    }
  }
}

module.exports = new BcryptService();
