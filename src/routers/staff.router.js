const express = require('express');
const controller = require('../controller/staff.controller');
const validator = require('../validator/staff.validator');

const router = express.Router();

router.route('/staff').post(...validator.creatStaff, controller.creatStaff);

module.exports = router;