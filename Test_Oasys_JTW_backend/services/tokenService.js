const jwt = require('jsonwebtoken');
const tokenModel = require('../models/tokenModel');
module.exports.jwtService = {
  generateToken: (payload) => {
    const token = jwt.sign(
      payload, // data to JWTing lol
      process.env.JWT_SECRET, // the secret key
      {},
    );
    return token;
  },
  validateToken: (token) => {
    // find token from db
    try {
      const userData = jwt.verify(token, process.env.JWT_SECRET);

      return userData;
    } catch (error) {
      return null;
    }
  },
};
