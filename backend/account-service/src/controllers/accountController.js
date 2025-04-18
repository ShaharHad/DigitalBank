const accountService = require("../services/accountService");

exports.createAccount = async (req, res, next) => {
  try {
    const { user_id, account_type, balance } = req.body;
    const account = await accountService.createAccount(user_id, account_type, balance);
    return res.status(201).json(account);
  } catch (err) {
    next(err);
  }
};

exports.getAccount = async (req, res, next) => {
  try {
    const user_id = parseInt(req.params.user_id);
    const account = await accountService.getAccount(user_id);
    return res.status(200).json(account);
  } catch (err) {
    next(err);
  }
};

exports.updateBalance = async (req, res, next) => {
  try {
    const user_id = parseInt(req.params.user_id);
    const new_balance = req.body.balance;
    await accountService.updateAccountBalance(user_id, new_balance);
    return res.status(200).json({ message: "Balance updated" });
  } catch (err) {
    next(err);
  }
};

exports.deleteAccount = async (req, res, next) => {
  try {
    const user_id = parseInt(req.params.user_id);
    await accountService.deleteAccount(user_id);
    return res.status(200).json({ message: "Account deleted" });
  } catch (err) {
    next(err);
  }
};
