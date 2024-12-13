const orderModel = require('../models/order');
const cartModel = require('../models/cart');
const { sendErrorResponse, sendSuccessResponse } = require('../utils/response');
const ThrowError = require('../utils/ThrowError');

exports.create = async (req, res) => {
    try {
        const user = req.user.userId;
        const cart = await cartModel.findOne({ user: user });
        const newOrder = new orderModel({
            user,
            ...req.body,
        })

        cart.items.pull(...req.body.items)
        await cart.save();
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
        const user = req.user.userId

        const findOrder = await orderModel.find({ user: user });

        if (findOrder.length === 0) {
            throw new ThrowError("No Order placed yet.");
        }

        sendSuccessResponse(res, "Your all orders fetched successfully", findOrder)
    } catch (e) {
        console.log(e)
        sendErrorResponse(res, e)
    }
}

exports.read = async (req, res) => {
    try {
        const orderNum = req.params.id;

        const findOrder = await orderModel.findById(orderNum);

        sendSuccessResponse(res, "Your order fetched successfully", findOrder)
    } catch (e) {
        console.log(e)
        sendErrorResponse(res, e)
    }
}