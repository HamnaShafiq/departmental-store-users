const express = require("express");
const router = express();

const user = require('./user')
const order = require('./order')
const cart = require('./cart')

router.use("/user", user);
router.use("/order", order);
router.use("/cart", cart);

module.exports = router;