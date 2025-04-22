const logger = require("../utils/logger");

module.exports = async (err, req, res, next) => {
    logger.error(err);
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "server error";

    return res.status(err.statusCode).json({message: err.message});
}