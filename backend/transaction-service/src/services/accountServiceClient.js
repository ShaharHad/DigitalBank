const axios = require('axios');

const {accountServiceUrl} = require('../../config');

const getAccount = async(userId) => {
    
    const res = await axios.get(`${accountServiceUrl}/${userId}`);

    return res.data;
}

module.exports = {getAccount}