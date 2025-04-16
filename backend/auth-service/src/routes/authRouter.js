const express = require('express');
const { validationResult } = require('express-validator');

const authController = require('../controllers/authController');
const validator = require('../middlewares/validatorMiddleware');
const createError = require('../utils/createError');


const router = express.Router();

const validateRequest = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(createError(422, errors.array()[0].msg));
    }
    return next();
};

router.post(
    '/register', 
    validator.registerValidateSchema, 
    validateRequest,
    authController.register
);

router.post(
    '/login', 
    validator.loginValidateSchema,
    validateRequest, 
    authController.login
);

module.exports = router;