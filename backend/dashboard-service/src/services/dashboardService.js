const transactionServiceClient = require('./transactionServiceClient');
const createError = require('../utils/createError');
const logger = require('../utils/logger');


exports.getDashboardData = async function (userId) {
  try {

    const TransactionType = {
      Deposit: 'deposit',
      Withdraw: 'withdraw',
    };
    
    const res = await transactionServiceClient.getTransactions(userId)
    const transactions = res.data || [];


    let totalDeposits = 0;
    let totalWithdrawals = 0;

    for (const transaction of transactions) {

      const amountNum = parseFloat(transaction.amount);
      if (transaction.type === TransactionType.Deposit) {
        totalDeposits += amountNum;
      } else if (transaction.type === TransactionType.Withdraw) {
        totalWithdrawals += amountNum;
      }
    }

    const balance = totalDeposits - totalWithdrawals;

    const lastTransactions = [...transactions]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

    return {
      balance,
      totalDeposits,
      totalWithdrawals,
      lastTransactions,
    };
  } catch (err) {
    logger.error("Error in getDashboardData:", err.message);
    throw createError(err.statusCode || 500, err.message || "Failed to fetch dashboard data");
  }
};
