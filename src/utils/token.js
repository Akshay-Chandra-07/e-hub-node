const jwt = require("jsonwebtoken");
const CryptoUtils = require("./crypto");

// Generate JWT token using private key
const createToken = (payload) => {
  try {
    const privateKey = process.env.PRIVATE_KEY;
    const token = jwt.sign(payload, privateKey, {
      expiresIn: "1h",
      algorithm: 'RS256'
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
    const decoded = jwt.verify(token, publicKey,{ algorithms: ['RS256'] });
    return decoded;
  } catch (error) {
    console.error("Token verification failed:", error);
    throw new Error("Token verification failed: " + error.message);
  }
};

module.exports = {
  createToken,
  verifyToken,
};
