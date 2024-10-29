const userModel = require('../models/user')
const { sendErrorResponse, sendSuccessResponse } = require('../utils/response');
const ThrowError = require('../utils/ThrowError');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username) {
            throw new ThrowError('Username is required.');
        }        

        const existingUser = await userModel.findOne({ username });

        if (existingUser) { throw new ThrowError('Username not available.') }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await userModel.create({ username, password: hashedPassword })

        console.log('newUser', newUser);

        sendSuccessResponse(res, 'You are registered successfully', newUser)
    } catch (e) {
        console.log(e)
        sendErrorResponse(res, e)
    }
}

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const findUser = await userModel.findOne({ username });

        if (!findUser) { throw new ThrowError('User is not registered.') }

        const matchPassword = await bcrypt.compare(password, findUser.password)

        if (!matchPassword) { throw new ThrowError('Incorrect password.') }

        sendSuccessResponse(res, 'You are logged in successfully', findUser)
    } catch (e) {
        console.log(e)
        sendErrorResponse(res, e)
    }
}