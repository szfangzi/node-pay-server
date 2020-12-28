'use strict';

const jwt = require('jsonwebtoken');

class AuthUtil {
  static createToken(userId, config){
    const { expire, secret, algorithm } = config;
    return jwt.sign({ userId }, secret, { algorithm, expiresIn: expire });
  }
}

module.exports = AuthUtil;
