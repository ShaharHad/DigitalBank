const userService = require('../services/userService');
const createError = require('../utils/createError');
const logger = require('../utils/logger');

exports.getUser = async (req, res, next) => {
    try {
        const { id } = req.params;

        const user = await userService.getUser(id);
        if(!user){
            next(createError(409, "User not found"));
        }

        return res.status(200).json(user);
    } catch (err) {
        logger.error("getUser");
        next(err);
    }
};

exports.createUser = async (req, res, next) => {
    try {
        const { id, name, phone } = req.body;
        console.log("here");
        const user = await userService.createUser( id, name, phone );
        return res.status(201).json(user);
    } catch (err) {
        logger.error("createUser");
        next(err);
    }
};

exports.updateUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const user = await userService.updateUser(id, updates);
        return res.status(200).json(user);
    } catch (err) {
        logger.error("updateUser");
        next(err);
    }
};