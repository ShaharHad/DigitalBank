const userService = require('../services/userService');
const createError = require('../utils/createError');

exports.getUser = async (req, res, next) => {
    try {
        const { id } = req.params;

        const user = await userService.getUser(id);
        if(!user){
            next(createError(409, "User not found"));
        }

        res.status(200).json(user);
    } catch (err) {
        next(err);
    }
};

exports.createUser = async (req, res, next) => {
    try {
        const { name, email, phone } = req.body;

        const user = await userService.createUser({ name, email, phone });
        res.status(201).json(user);
    } catch (err) {
        next(err);
    }
};

exports.updateUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const user = await userService.updateUser(id, updates);
        res.status(200).json(user);
    } catch (err) {
        next(err);
    }
};