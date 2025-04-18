const { checkSchema } = require('express-validator');

exports.registerValidateSchema = checkSchema({
    name: {
        in: ["body"],
        exists: {
            errorMessage: "Name is required",
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
    phone: {
        in: ["body"],
        exists: {errorMessage: "Phone is required"},
        isLength: {
            options: {  },
            errorMessage: "Email should be maximum 50 characters",
        },
        isString: {
            errorMessage: "Phone number must be a string",
        },
        isLength: {
            options: { min: 10, max: 10 },
            errorMessage: "Phone number must be exactly 10 digits",
        },
        matches: {
            options: [/^\d{10}$/],
            errorMessage: "Phone number must contain only digits (0-9)",
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