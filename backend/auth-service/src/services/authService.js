const Auth = require('../models/authModel');
const { hashString, compareStrings } = require('../utils/hash');
const createError = require('../utils/createError');
const generateJWT = require('../utils/createJWT');
const userServiceClient = require('./userServiceClient');
const accountServiceClient = require('./accountServiceClient');
const logger = require('../utils/logger');

exports.register = async (name, email, password, phone) => {

    const existingUser = await Auth.findByEmail(email);
    if(existingUser){
        throw createError(409, "Email already in use");
    }

    const hashedPassword = await hashString(password);
    const newUserId = await Auth.createUser(email, hashedPassword);
    var newUser = null;
    var newAccount = null;
    try{
        newUser = await userServiceClient.createUser(newUserId, name, phone);
        newAccount = await accountServiceClient.createUser(newUserId, name, phone);
    }
    catch (err){
        await Auth.delete(email);
        logger.info("Error with userServiceClient/accountServiceClient - remove Auth user record")
        throw err;
    }

    return { id: newUser.id, name: newUser.name };
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
    const res = {
        user:{id: user.id, email: user.email},
        token: token,
    }

    return res;
}