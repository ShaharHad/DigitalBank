const User = require('../models/userModel');
const createError = require('../utils/createError');

exports.getUser = async (id) => {
    const user = await User.findById(id);
    if (!user) {
        throw createError(404, `User not found`);
    }
    return user;
};

exports.createUser = async (id, name, phone ) => {
    const userExisting = await User.findById(id);
    if (userExisting) {
        throw createError(409, "Id already exists");
    }

    const newUser = await User.create( id, name, phone );
    return newUser;
};

exports.updateUser = async (id, updates) => {
    const existing = await User.findById("id", id);
    if (!existing) {
        throw createError(404, "User not found");
    }

    await User.update(id, updates);
    const updated = await User.update(id, updates);
    return updated;
};
