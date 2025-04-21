const transactionModel = require("../models/transactionModel");

const accountServiceClient = require('./accountServiceClient')

exports.deposit = async (userId, amount, description = null) => {
  
  const account = await accountServiceClient.getAccount(userId);
  const depositTransaction = await transactionModel.insertTransaction(account.id, "deposit", amount, description);

  return depositTransaction;
};

exports.withdraw = async (userId, amount, description = null) => {
    const account = await accountServiceClient.getAccount(userId);
    const withdrawTransaction = await transactionModel.insertTransaction(account.id, "withdraw", amount, description);
  
    return withdrawTransaction;
};

exports.transfer = async (userId_sender, userId_receiver, amount, description = null) => {
const depositTransaction = await transactionModel.insertTransaction(userId_sender, userId_receiver, "transfer", amount, description);

return depositTransaction;
};

exports.getTransactions = async (userId) => {
  const account = await accountServiceClient.getAccount(userId);
  const transactions = await transactionModel.getTransactionsByAccountId(account.id);
  
  return transactions;
  };