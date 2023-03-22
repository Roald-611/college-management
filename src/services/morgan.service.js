const morgan = require('morgan');
const logger = require('./logger.service');

//Declarations & Implementations
const morganInstance = morgan('dev', {
    stream: {
        write: (str) => {
            logger.debug(str);
        },
    },
});

module.exports = morganInstance;