const express = require("express");
const { validationResult } = require('express-validator');
const createError = require('../utils/createError');

const router = express.Router();
const accountController = require("../controllers/accountController");
const { createAccountValidator, updateBalanceValidator } = require("../middlewares/validatorMiddleware");

const validateRequest = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(createError(422, errors.array()[0].msg));
    }
    return next();
};

router.post(
    "/", 
    createAccountValidator, 
    validateRequest, 
    accountController.createAccount
);

router.get(
    "/:user_id", 
    accountController.getAccount
);

router.put(
    "/:user_id/balance", 
    updateBalanceValidator, 
    validateRequest, 
    accountController.updateBalance);

router.delete(
    "/:user_id", 
    accountController.deleteAccount
);

module.exports = router;
