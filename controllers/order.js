const orderModel = require('../models/order');
const { sendErrorResponse, sendSuccessResponse } = require('../utils/response');
const ThrowError = require('../utils/ThrowError');

exports.create = async (req, res) => {
    try {
        const newOrder = new orderModel({
            ...req.body,
        })

        await newOrder.save();

        sendSuccessResponse(res, "Order placed successfully", newOrder)
    } catch (e) {
        console.log(e)
        sendErrorResponse(res, e)
    }
}

exports.cancel = async (req, res) => {
    try {
        const cancelOrder = await orderModel.findByIdAndDelete(req.params.id);

        if (!cancelOrder) {
            throw new ThrowError("Order not found");
        }

        sendSuccessResponse(res, "Order canceled successfully", cancelOrder)
    } catch (e) {
        console.log(e)
        sendErrorResponse(res, e)
    }
}

exports.all = async (req, res) => {
    try {
        const findOrder = await orderModel.find({ user: req.params.id });

        if (findOrder.length === 0) {
            throw new ThrowError("No Order placed yet.");
        }

        sendSuccessResponse(res, "Your all orders fetched successfully", findOrder)
    } catch (e) {
        console.log(e)
        sendErrorResponse(res, e)
    }
}