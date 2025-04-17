const axios = require('axios');

const userServiceUrl = require('../../config').userServiceUrl;

const createUser = async(id, name, phone) => {
    const res = await axios.post(`${userServiceUrl}/`, {
        "id": id,
        "name": name,
        "phone": phone
    });
    
    return res.data;
}

module.exports = {createUser}