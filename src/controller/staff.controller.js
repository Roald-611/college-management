const { validationResult } = require('express-validator');
const mongoose = require('mongoose');
// const StaffModel = mongoose.model('staff', staffSchema);
const StaffModel = require('../models/staff.model')

/**
 * @param req
 * @param res
 * @returns {Promise<void>}
 */

const creatStaff = async (req, res) => {
    try {
        // const errors = validationResult(req);
        // if (!errors.isEmpty()) {
        //     return res.sendResponse(400, { data: errors.array() });
        // }
        const staff = await new StaffModel(req.body);
        await staff.save();
        return res.sendResponse(200, { data: staff })
    } catch (error) {
        return res.sendResponse(500, { error });
    }
}

module.exports = { creatStaff };