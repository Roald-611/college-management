const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const fs = require('fs');
const mongoose = require('mongoose');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');

//required Services & Helper
const logger = require('./services/logger.service');
const morganLogger = require('./services/morgan.service');
const sendResponseHelper = require('./helper/response.helper');

// Declarations
const models = path.join(__dirname, 'models');
const dbURL = process.env.DB_URL || 'mongodb://127.0.0.1:27017/collageManagement';

//Read All models
fs.readdirSync(models).forEach((file) => require(path.join(models, file)));

//Bootstrap App
const app = express()

//CORS
app.use(
    cors({
        origin: true,
        methods: ['GET', 'POST', 'DELETE', 'PATCH'],
        allowedHeaders: [
            'Origin',
            ' X-Requested-With',
            ' Content-Type',
            ' Accept ',
            ' Authorization',
        ],
        credentials: true,
    }),
);

app.use(morganLogger);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//Swagger Definition
// const swaggerDocument = require('./swagger.json');

// app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Import and Register Router
const index = require('./routers/index');

app.use('/api', (req, res, next) => {
    res.sendResponse = sendResponseHelper.sendResponse;

    next();
}, index);

//Catch 404 routes
app.use(function (req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

//Mongoose Configuration
mongoose.connection.on('connected', () => {
    logger.info('DATABASE - Connected');
});

mongoose.connection.on('error', (err) => {
    logger.error(`DATABASE -Error:${err}`)
});

mongoose.connection.on('disconnected', () => {
    logger.warn('DATABASE - Disconnected Retrying...');
});

const connectDb = function () {
    const dbOptions = {
        poolSize: 5,
        reconnectTries: Number.MAX_SAFE_INTEGER,
        reconnectInterval: 500,
        useNewUrlParser: true,
    };
    mongoose.connect(dbURL).catch((err) => {
        logger.fatal(`DATABASE - Error:${err}`);
    });
};

connectDb();

// app.use();

module.exports = app;