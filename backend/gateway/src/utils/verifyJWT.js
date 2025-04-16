const jwt = require('jsonwebtoken');
const jwtConfig = require('../../config').jwt

const verifyJWT = (token) => {
    return jwt.verify(token, jwtConfig.secret);
}

module.exports = verifyJWT;