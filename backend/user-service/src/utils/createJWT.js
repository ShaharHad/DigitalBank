const jwt = require('jsonwebtoken');

const jwtConfig = require('../../config').jwt;

const generateJWT = (payload) => {
    const expiresIn = jwtConfig.expiresIn;

    return jwt.sign(payload, jwtConfig.secret, {expiresIn});
}

module.exports = generateJWT;