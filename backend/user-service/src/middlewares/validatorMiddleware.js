const { checkSchema } = require('express-validator');

exports.createUserValidateSchema = checkSchema({
    name: {
        in: ["body"],
        exists: {
            errorMessage: "Name is required",
            options: { checkFalsy: true },  // if the variable is null/0/""/false ... validation is fail
        },
        isString: { errorMessage: "Name should be a string" },
        isLength: {
            options: { min: 2, max: 50 },
            errorMessage: "Name should be between 2 and 50 characters",
        },
    },
    email: {
        in: ["body"],
        exists: { errorMessage: "Email is required" },
        isEmail: { errorMessage: "Please provide a valid email" },
        isLength: {
            options: { max: 100 },
            errorMessage: "Email should be a maximum of 100 characters",
        },
    },

    password: {
        in: ["body"],
        exists: { errorMessage: "Password is required" },
        isString: { errorMessage: "Password should be a string" },
        isLength: {
            options: { min: 8, max: 20 },
            errorMessage: "Password should be at least 8 characters and at most 20 characters",
        },
    },
});

exports.updateUserValidateSchema = checkSchema({
    id: {
        in: ["params"],
        exists: { errorMessage: "Id is required" },
    },
    name: {
        in: ["body"],
        optional: true, // name is optional during update
        isString: { errorMessage: "Name should be a string" },
        isLength: {
            options: { min: 2, max: 50 },
            errorMessage: "Name should be between 2 and 50 characters",
        },
    },
    email: {
        in: ["body"],
        optional: true, // email is optional during update
        isEmail: { errorMessage: "Please provide a valid email" },
        isLength: {
            options: { max: 100 },
            errorMessage: "Email should be a maximum of 100 characters",
        },
    },
    password: {
        in: ["body"],
        optional: true,  // password is optional during update
        isString: { errorMessage: "Password should be a string" },
        isLength: {
            options: { min: 8, max: 20 },
            errorMessage: "Password should be at least 8 characters and at most 20 characters",
        },
    },
});

exports.getUserValidateSchema = checkSchema({
    id: {
        in: ["params"],
        exists: { errorMessage: "Id is required" },
    },
});