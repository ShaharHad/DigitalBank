require('dotenv').config();

module.exports = {
    db: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    },
    jwt: {
        secret: process.env.JWT_SECRET,
        expiresIn: '1h'
    },
    userServiceUrl: process.env.USER_SERVICE_URL,
    accountServiceUrl: process.env.ACCOUNT_SERVICE_URL
}
