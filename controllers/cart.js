const cartModel = require('../models/cart');
const { sendErrorResponse, sendSuccessResponse } = require('../utils/response');
const ThrowError = require('../utils/ThrowError');

exports.addItem = async (req, res) => {
    try {

        let data = await cartModel.findOne({ user: req.body.user });

        if (!data) {
            data = await cartModel.create({
                ...req.body
            })
        } else {
            {
                req.body.items.map((item) => {
                    data.items.push(item)
                })
            }
            await data.save();
        }

        sendSuccessResponse(res, "Product added to cart", data)
    } catch (e) {
        console.log(e)
        sendErrorResponse(res, e)
    }
}

exports.removeItem = async (req, res) => {
    try {
        const { itemId, user } = req.body;

        const cart = await cartModel.findOne({ user });

        const data = await cartModel.updateOne(
            { user },
            { $pull: { items: { _id: itemId } } }
        )

        if (data.nModified === 0) {
            return sendErrorResponse(res, "Item not found in cart");
        }

        console.log('item', data);

        sendSuccessResponse(res, 'Item removed successfully from cart.')

    } catch (e) {
        console.log(e)
        sendErrorResponse(res, e)
    }
}

exports.all = async (req, res) => {
    try {
        const { userId } = req.params;

        const data = await cartModel.findOne({ userId });

        sendSuccessResponse(res, 'All items fetched successfully.', data)
    } catch (e) {
        console.log(e)
        sendErrorResponse(res, e)
    }
}