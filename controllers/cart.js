const cartModel = require('../models/cart');
const { sendErrorResponse, sendSuccessResponse } = require('../utils/response');
const ThrowError = require('../utils/throwError');

exports.addItem = async (req, res) => {
    try {
        const userId = req.user.userId;
        const productId = req.params.id;
        let data = await cartModel.findOne({ user: userId });

        if (data) {
            data.items.push({ product: productId });
        } else {
            data = await cartModel.create({
                user: userId,
                items: [{ product: productId }]
            });
        }

        await data.save();

        sendSuccessResponse(res, "Product added to cart", data)
    } catch (e) {
        console.log(e)
        sendErrorResponse(res, e)
    }
}

exports.removeItem = async (req, res) => {
    try {
        const user = req.user.userId;

        const itemId = req.params.id;

        const findUser = await cartModel.findOne({ user: user });

        // const findItem = findUser.items.some((it)=>it._id.toString() ===itemId)
                
        findUser.items.pull({ _id: itemId })

        findUser.save();

        sendSuccessResponse(res, 'Item removed successfully from cart.')

    } catch (e) {
        console.log(e)
        sendErrorResponse(res, e)
    }
}

exports.all = async (req, res) => {
    try {
        const userId = req.user.userId;
        const data = await cartModel.findOne({ user: userId }).populate('items.product');

        sendSuccessResponse(res, 'All items fetched successfully.', data)
    } catch (e) {
        console.log(e)
        sendErrorResponse(res, e)
    }
}

exports.updateQuantity = async (req, res) => {
    try {
        const { productId, quantity } = req.body;

        const data = await cartModel.findOne({ user: req.user.userId });

        const item = data.items.find(item => item.product.toString() === productId);

        if (!item) {
            return res.status(404).json({ success: false, msg: "Product not found in cart" });
        }

        item.quantity = quantity;

        await data.save();

        sendSuccessResponse(res, 'Cart item updated successfully', data)
    } catch (e) {
        console.log(e)
        sendErrorResponse(res, e)
    }
}