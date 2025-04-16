const User = require('../models/userModel');
const createError = require('../utils/createError');

exports.getUser = async (id) => {
    const user = await User.findById(id);
    if (!user) {
        throw createError(404, `User not found by ${field}`);
    }
    return user;
};

exports.createUser = async ({ name, email, phone }) => {
    const userExisting = await User.findBy("email", email);
    if (userExisting) {
        throw createError(409, "Email already exists");
    }

    const newUser = await User.create({ name, email, phone });
    return newUser;
};

exports.updateUser = async (id, updates) => {
    const existing = await User.findBy("id", id);
    if (!existing) {
        throw createError(404, "User not found");
    }

    await User.update(id, updates);
    const updated = await User.findBy("id", id);
    return updated;
};
