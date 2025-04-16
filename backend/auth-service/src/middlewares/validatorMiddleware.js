const { checkSchema } = require('express-validator');

exports.registerValidateSchema = checkSchema({
    name: {
        in: ["body"],
        exists: {
            errorMessage: "Name is required",
            options: { checkFalsy: true }, // if the variable is null/0/""/false ... validation is fail
        },
        isString: { errorMessage: "Name should be string" },
        isLength: {
            options: { max: 20 },
            errorMessage: "Name should be maximum 20 characters",
        },
    },
    password: {
        in: ["body"],
        exists: { errorMessage: "Password is required" },
        isString: { errorMessage: "Password should be string" },
        isLength: {
            options: { min: 5, max: 20 },
            errorMessage: "Password should be at least 5 characters and maximum 20 characters",
        },
    },
    email: {
        in: ["body"],
        exists: {errorMessage: "Email is required"},
        isEmail: { errorMessage: "Please provide valid email" },
        isLength: {
            options: { max: 50 },
            errorMessage: "Email should be maximum 50 characters",
        },
    },
});

exports.loginValidateSchema = checkSchema({
    email: {
        in: ["body"],
        exists: {errorMessage: "Email is required"},
        isEmail: { errorMessage: "Please provide valid email" },
        isLength: {
            options: { max: 50 },
            errorMessage: "Email should be maximum 50 characters",
        },
    },
    password: {
        in: ["body"],
        exists: { errorMessage: "Password is required" },
        isString: { errorMessage: "Password should be string" },
        isLength: {
            options: { min: 5, max: 20 },
            errorMessage: "Password should be at least 5 characters and maximum 20 characters",
        },
    },

});