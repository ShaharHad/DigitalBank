const express = require("express");
// const { validationResult } = require('express-validator');
// const createError = require('../utils/createError');

const router = express.Router();
const transactionController = require("../controllers/transactionController");
// const { createAccountValidator, updateBalanceValidator } = require("../middlewares/validatorMiddleware");

// const validateRequest = (req, res, next) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return next(createError(422, errors.array()[0].msg));
//     }
//     return next();
// };

router.post("/deposit", transactionController.deposit);

router.post("/withdraw", transactionController.withdraw);

router.post("/transfer", transactionController.transfer);

router.get("/:userId", transactionController.getTransactions);

module.exports = router;
