require('dotenv').config();
const express = require('express');
const morgan = require("morgan");

const logger = require("./utils/logger");
const authRoute = require('./routes/authRouter')

const errorMiddleware = require('./middlewares/errorMiddleware');

app = express();

app.use(express.json());

const middlewareMorgan = morgan(
    ":method :url :status :response-time ms",
    {
        write: (message) => logger.http(message.trim()),
});

app.use(middlewareMorgan);

app.use('/', authRoute);

app.use(errorMiddleware);

module.exports = app;