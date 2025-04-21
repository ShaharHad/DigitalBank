require('dotenv').config();
const express = require('express');
const proxy = require('express-http-proxy');
const cors = require('cors');
const morgan = require("morgan");

const errorMiddleware = require('./middlewares/errorMiddleware');
const authMiddleware = require('./middlewares/authMiddleware');

app = express();

const middlewareMorgan = morgan(
    ":method :url :status :response-time ms",
    {
        write: (message) => logger.http(message.trim()),
});




const allowedOrigins = ["http://localhost:5000"];

const corsOptions = {
    origin: allowedOrigins,
    credentials: true,
    method: ["GET", "POST", "DELETE", "OPTIONS", "PUT"],
    allowedHeaders:["Content-Type", "Authorization"]
};

app.use(middlewareMorgan);
app.use(cors(corsOptions));
// app.use(authMiddleware);

app.use('/api/v1/auth', proxy(process.env.AUTH_SERVICE));
app.use('/api/v1/user', proxy(process.env.USER_SERVICE));
app.use('/api/v1/account', proxy(process.env.ACCOUNT_SERVICE));
app.use('/api/v1/transaction', proxy(process.env.TRANSACTION_SERVICE));

// for tests 
app.use('/api/v1/ping', (req, res) => res.status(200).json(
    {message: "Gateway is alive"}
));

app.use(errorMiddleware);

module.exports = app;