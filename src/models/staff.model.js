const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Departments = require('./department.model');

const staffSchema = new mongoose.Schema({
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
            if (value.includes('password')) {
                throw new Error(`Password can't contain "password"`)
            }
        }
    }, age: {
        type: Number,
        trim: true,
        default: 18,
    }, avatar: {
        type: Buffer
    }
}, {
    timestamps: true
})

staffSchema.virtual('departments', {
    ref: 'Departments',
    localField: "_id",
    foreignField: "head"
})

staffSchema.methods.toJSON = function () {
    const staff = this;
    const staffObject = staff.toObject();

    delete staffObject.password;
    delete staffObject.avatar;

    return staffObject;
}

staffSchema.methods.generateAuthToken = async function () {
    const staff = this;
    const token = jwt.sign({ _id: staff._id.toString() }, process.env.JWT_TOKEN);

    return token;
}

staffSchema.statics.findByCredentials = async (email, password) => {
    const staff = await Staff.findOne({ email })

    if (!staff) {
        throw new Error('Given email is not exists!')
    }
    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
        throw new Error('Given Credentials is Miss Match!')
    }

    return staff;
}

const Staff = mongoose.model('Staff', staffSchema);

module.exports = Staff;