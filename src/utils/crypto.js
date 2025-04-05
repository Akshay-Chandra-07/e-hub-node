const CryptoJS = require("crypto-js");

class CryptoUtils {
  _secretKey;
  constructor() {
    this._secretKey = process.env.CRYPTO_SECRET;
  }

  // Encrypt data using AES
  encrypt(data) {
    try {
      return CryptoJS.AES.encrypt(
        JSON.stringify(data),
        this._secretKey
      ).toString();
    } catch (error) {
      throw new Error("Encryption failed: " + error.message);
    }
  }

  // Decrypt data using AES
  decrypt(encryptedData) {
    try {
      const bytes = CryptoJS.AES.decrypt(encryptedData, this._secretKey);
      return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    } catch (error) {
      throw new Error("Decryption failed: " + error.message);
    }
  }

  // Generate a secure random key
  // static generateKey(length = 32) {
  //   return CryptoJS.lib.WordArray.random(length).toString();
  // }

  // // Hash data using SHA256
  // static hash(data) {
  //   return CryptoJS.SHA256(data).toString();
  // }
}

module.exports = new CryptoUtils();
