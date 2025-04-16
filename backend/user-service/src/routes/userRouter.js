const express = require('express');
const { validationResult } = require('express-validator');

const userController = require('../controllers/userController');
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

router.post('/', 
    validator.createUserValidateSchema, 
    validateRequest, 
    userController.createUser
);

router.get('/:field/:value', 
    validator.getUserValidateSchema, 
    validateRequest, 
    userController.getUser
);

router.get('/:id', 
    validator.getUserValidateSchema, 
    validateRequest, 
    userController.getUser
);

router.put('/:id', 
    validator.updateUserValidateSchema, 
    validateRequest, 
    userController.updateUser
);


module.exports = router;