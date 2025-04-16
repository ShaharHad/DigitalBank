const Auth = require('../models/authModel');
const { hashString, compareStrings } = require('../utils/hash');
const createError = require('../utils/createError');
const generateJWT = require('../utils/createJWT');

exports.register = async ({name, email, password}) => {
    const existingUser = await Auth.findByEmail(email);
    if(existingUser){
        throw createError(409, "Email already in use");
    }

    const hashedPassword = await hashString(password);
    const newUser = await Auth.createUser({name, email, password: hashedPassword});

    return { id: newUser.id, name: newUser.name, email: newUser.email };
}

exports.login = async (email, password) => {
    const user = await Auth.findByEmail(email);
    if(!user){
        throw createError(404, "Email not found");
    }

    const comparePassword = await compareStrings(password, user.password);
    if(!comparePassword){
        throw createError(401, "Password not match");
    }

    const token = generateJWT({email: user.email});

    return { user: {name: user.name, email: user.email}, token: token};
}