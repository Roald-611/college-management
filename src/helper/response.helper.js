const { STATUS_CODES } = require("http")

//System Helper & Services
const logger = require("../services/logger.service");

//Functions
function logError(errorObject) {
    if (errorObject && errorObject instanceof Error) {
        logger.error('ERROR :', errorObject.message || errorObject);
        console.trace(errorObject);
    }
}

function sendResponse(statusCode = 200, { code, data, error } = {}) {
    if (error) {
        logError(error);
    }

    code = code || STATUS_CODES[statusCode].toUpperCase().replace(/ /g, '-');

    this.status(statusCode).json({
        status: statusCode >= 400 ? "ERROR" : "SUCCESS",
        code,
        data
    });
}

module.exports = {
    sendResponse
}