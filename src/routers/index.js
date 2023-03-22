const express = require('express');
const departmentRoute = require('./department.router');
const studentRoute = require('./student.router');
const staffRoute = require('./staff.router');

const router = express.Router();

router.use('/collage', departmentRoute);
router.use('/collage', staffRoute);
// router.use('/student', studentRoute);

module.exports = router;