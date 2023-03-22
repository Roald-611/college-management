const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
    year: {
        type: Number,
        required: true,
        trim: true
    }, students: {
        type: Number,
        required: true
    }, branches: {
        CE: {
            type: Number,
            required: true
        }, ME: {
            type: Number,
            required: true
        }
    }, head: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Staff'
    }, minattandence: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
})

const Departments = mongoose.model('Departments', departmentSchema)

module.exports = Departments;