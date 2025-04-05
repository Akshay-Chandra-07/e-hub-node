const jwt = require("jsonwebtoken");
const CryptoUtils = require("./crypto");

// Generate JWT token using private key
const createToken = (payload) => {
  try {
    const privateKey = process.env.PRIVATE_KEY;
    const token = jwt.sign(payload, privateKey, {
      expiresIn: "1h",
    });

    // Encrypt the JWT token
    return CryptoUtils.encrypt(token);
  } catch (error) {
    throw new Error("Token creation failed: " + error.message);
  }
};

// Verify JWT token using public key
const verifyToken = (encryptedToken) => {
  try {
    const publicKey = process.env.PUBLIC_KEY;
    const token = CryptoUtils.decrypt(encryptedToken);
    jwt.verify(token, publicKey, async (err, decoded) => {
      if (err) {
        throw new Error("Token verification failed: " + err.message);
      } else {
        return decoded;
      }
    });
  } catch (error) {
    console.error("Token verification failed:", error);
    return false;
  }
};

module.exports = {
  createToken,
  verifyToken,
};
