const bcrypt = require('bcryptjs');

exports.hashString = (str) => {
    return bcrypt.hash(str, 3);
}

exports.compareStrings = (str, hashed) => {
    return bcrypt.compare(str, hashed);
}