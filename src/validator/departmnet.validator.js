const { body } = require('express-validator');

/**
 * Validate express incoming request
 * @type {(arg is any[]|*)[]}
 */

const createDepartments = [
    body().isJSON(),
    body('year').notEmpty().isNumeric(),
    body('students').notEmpty().isNumeric(),
    body('branches').notEmpty().isObject(),
    body('*.CE').notEmpty().isNumeric(),
    body('*.ME').notEmpty().isNumeric(),
    body('minattandence').notEmpty().isNumeric(),
];

module.exports = {
    createDepartments
}