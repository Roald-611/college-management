const { body } = require('express-validator');
const { default: isEmail } = require('validator/lib/isEmail');

/**
 * validate express incoming req.
 * @type {(arge is any[]|*)[]}
 */

const creatStaff = [
    body().isJSON(),
    body('name').notEmpty().isString(),
    body('email').notEmpty().isString().isEmail().isLowercase(),
    body('password').notEmpty().isString().isLength({ min: 7 }),
    body('age').isNumeric().default(18)
];

module.exports = {
    creatStaff
};