const axios = require('axios');
const transactionServiceUrl = require('../../config').transactionServiceUrl;

exports.getTransactions = async (userId) => {
    
    const transactions = await axios.get(`${transactionServiceUrl}/${userId}`);
    
    return transactions;
}
