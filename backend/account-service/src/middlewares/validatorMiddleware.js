const { checkSchema } = require('express-validator');

exports.createAccountValidator = checkSchema({
    user_id: {
        in: ["body"],
        isInt: { errorMessage: "user_id must be an integer" },
        toInt: true
    },
    account_type: {
        in: ["body"],
        optional: true,
        isIn: {
            options: [["personal", "business"]],
            errorMessage: "account_type must be 'personal' or 'business'"
        }
    },
    balance: {
        in: ["body"],
        optional: true,
        isDecimal: { errorMessage: "balance must be a decimal number" },
        toFloat: true
    }
  });

  exports.updateBalanceValidator = checkSchema({
        balance: {
            in: ["body"],
            isDecimal: { errorMessage: "balance must be a decimal number" },
            toFloat: true
        }
  });