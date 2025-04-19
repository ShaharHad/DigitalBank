const axios = require('axios');

const {accountServiceUrl} = require('../../config');

const createUser = async(id, name, phone) => {
    const res = await axios.post(`${accountServiceUrl}/`, {
        "id": id,
        "name": name,
        "phone": phone
    });
    
    return res.data;
}

module.exports = {createUser}