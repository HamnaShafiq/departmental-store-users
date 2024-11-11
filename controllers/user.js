const userModel = require('../models/user')
const { sendErrorResponse, sendSuccessResponse } = require('../utils/response');
const ThrowError = require('../utils/ThrowError');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email) {
            throw new ThrowError('Email is required.');
        }

        const existingUser = await userModel.findOne({ email });

        if (existingUser) { throw new ThrowError('Email already exist.') }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await userModel.create({ email, password: hashedPassword })

        sendSuccessResponse(res, 'You are registered successfully', newUser)
    } catch (e) {
        console.log(e)
        sendErrorResponse(res, e)
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const findUser = await userModel.findOne({ email });

        if (!findUser) { throw new ThrowError('User is not registered.') }

        const matchPassword = await bcrypt.compare(password, findUser.password)

        if (!matchPassword) { throw new ThrowError('Incorrect password.') }

        sendSuccessResponse(res, 'You are logged in successfully', findUser)
    } catch (e) {
        console.log(e)
        sendErrorResponse(res, e)
    }
}