const express = require('express');
const controller = require('../controller/department.controller');
const validator = require('../validator/departmnet.validator');


const router = express.Router();

router.route('/department').post(...validator.createDepartments, controller.createDepartments);

module.exports = router;