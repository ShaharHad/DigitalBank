const accountModel = require("../models/accountModel");
const createError = require("../utils/createError");

exports.createAccount = async (user_id, account_type, balance) => {
  const accountExisting = await accountModel.getAccountByUserId(user_id);
  if (accountExisting) {
    loggers.error("createAccount");
    throw createError(409, "Account already exists for this user");
  }
  return await accountModel.createAccount(user_id, account_type, balance);
};

exports.getAccount = async (user_id) => {
  const account = await accountModel.getAccountByUserId(user_id);
  if (!account) {
    loggers.error("getAccount");
    throw createError(404, "Account not found");
  }
  return account;
};

//TODO throw another status code?
exports.updateAccountBalance = async (user_id, new_balance) => {
  const updated = await accountModel.updateBalance(user_id, new_balance);
  if (!updated) {
    loggers.error("updateAccountBalance");
    throw createError(404, "Failed to update balance");
  }
  return true;
};

//TODO throw another status code?

exports.deleteAccount = async (user_id) => {
  const deleted = await accountModel.deleteAccount(user_id);
  if (!deleted) {
    loggers.error("deleteAccount");
    throw createError(500, "Failed to delete account");
  }
  return true;
};
