const transactionService = require("../services/transactionService");
const logger = require('../utils/logger');



exports.deposit = async (req, res, next) => {
  try {
    const { userId, amount, description } = req.body;
    const depositTransaction = await transactionService.deposit(userId, amount, description);
    return res.status(201).json(depositTransaction);
  } catch (err) {
    logger.error("deposit");
    next(err);
  }
};

exports.withdraw = async (req, res, next) => {
  try {
    const { userId, amount, description } = req.body;
    const withdrawTransaction = await transactionService.withdraw(userId, amount, description);
    return res.status(200).json(withdrawTransaction);
  } catch (err) {
    logger.error("withdraw");
    next(err);
  }
};

exports.transfer = async (req, res, next) => {
    try {
      const { account_id_sender, account_id_receiver, amount, description } = req.body;
      const transferTransaction = await transactionService.transfer(account_id_sender, account_id_receiver, amount, description);
      return res.status(200).json(transferTransaction);
    } catch (err) {
      logger.error("transfer");
      next(err);
    }
  };

  exports.getTransactions = async (req, res, next) => {
    try {
      const { userId} = req.params;
      const transactions = await transactionService.getTransactions(userId);
      return res.status(200).json(transactions);
    } catch (err) {
      logger.error("getTransactions");
      return next(err);
    }
  };
