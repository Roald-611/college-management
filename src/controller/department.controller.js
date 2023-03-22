const { validationResult } = require("express-validator");
const mongoose = require('mongoose');
const Departments = require("../models/department.model");
// const DepartmentModel = mongoose.model('department');


/**
 * Create new Department & validate body data
 * @param  req 
 * @param  res 
 * @returns {Promise<void>}
 */

const createDepartments = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.sendResponse(400, { data: errors.array() });
        }
        const department = await new Departments(req.body);
        // const department = await new DepartmentModel(req.body);
        await department.save();

        return res.sendResponse(200, { data: department })
    } catch (error) {
        return res.sendResponse(500, { error: e });
    }
}

module.exports = { createDepartments }
