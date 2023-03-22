const log4js = require('log4js');

//Declarations & Implementations
const log = log4js.getLogger();
log.level = process.env.LOG_LEVEL || 'all';


module.exports = log;