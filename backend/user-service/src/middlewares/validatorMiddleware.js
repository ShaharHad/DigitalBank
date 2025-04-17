const { checkSchema } = require('express-validator');

exports.createUserValidateSchema = checkSchema({
    id: {
        in: ["body"],
        exists: {
            errorMessage: "Id is required",
        },
    },
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
    phone: {
        in: ["body"],
        exists: { errorMessage: "Phone is required" },
        isString: { errorMessage: "Phone should be a string" },
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

exports.updateUserValidateSchema = checkSchema({
    id: {
        in: ["params"],
        exists: { errorMessage: "Id is required" },
    },
    name: {
        in: ["body"],
        optional: true,
        isString: { errorMessage: "Name should be a string" },
        isLength: {
            options: { min: 2, max: 50 },
            errorMessage: "Name should be between 2 and 50 characters",
        },
    },
    phone: {
        in: ["body"],
        optional: true,
        isString: { errorMessage: "Phone should be a string" },
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

exports.getUserValidateSchema = checkSchema({
    id: {
        in: ["params"],
        exists: { errorMessage: "Id is required" },
    },
});