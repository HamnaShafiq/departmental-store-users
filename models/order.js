const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        shippingAddress: {
            fullName: { type: String, required: true },
            addressLine1: { type: String, required: true },
            addressLine2: { type: String },
            city: { type: String, required: true },
            postalCode: { type: String, required: true },
            phoneNumber: { type: String, required: true },
        },
        PaymentMethod: {
            type: 'String',
            enum: ['Cash on Delivery', 'Credit Card', 'Bank Transfer', 'PayPal'],
            required: true,
        },
        totalAmount: {
            type: Number,
            required: true,
        },
        items: [{
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true,
            },
            quantity: {
                type: Number,
                min: 1,
                required: true,
            },
            price: {
                type: Number,
                required: true,
            }
        }],
        status: {
            type: String,
            enum: ['Pending', 'Confirmed', 'Shipped', 'Delivered', 'Canceled'],
            default: 'Pending',
            required: true,
        },
        discount: {
            type: Number,
            default: 0,
        }
    }, {
    timestamps: true
})

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;