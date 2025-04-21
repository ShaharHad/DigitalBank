const { jwtSecret } = require("../../config");
const createError = require('../utils/createError')
const verifyJWT = require('../utils/verifyJWT');

const excludedPaths = [
    "/api/v1/auth/login",
    "/api/v1/auth/register"
];

module.exports = async (req, res, next) => {
    if (excludedPaths.includes(req.path)) {
        return next();
    }

    const authHeader = req.headers.authorization;
    console.log(req.headers)

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return next(createError(401, "Unauthorized: No token provided"))
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = verifyJWT(token, jwtSecret);
        req.user = decoded;
        next();
    } catch (err) {
        return next(createError(401, "Unauthorized: Invalid token"));
    }
};
