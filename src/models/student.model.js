//for attandence we create a arr of date and add date with help of login we take date from date() ande compare with arr if excest then don't add else add

const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    }, email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
        validator(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Invalid email!')
            }
        }
    }, password: {
        type: String,
        required: true,
        trim: true,
        minlength: 7,
        validator(value) {
            if (value.include('password')) {
                throw new Error(`Password can't contain "password"`);
            }
        }
    }, DOB: {
        type: String,
        required: true
    }, phone: {
        type: Number,
        required: true,
        trim: true,
        length: 10
    }, department: {
        type: String,
        required: true
    }, batch: {
        type: Number,
        required: true
    }, sem: {
        type: Number,
        required: true
    }, attendance: [{
        type: String,//date
        required: true
    }]
}, {
    timestamps: true
});

const Students = mongoose.model('Students', studentSchema);

module.exports = Students;