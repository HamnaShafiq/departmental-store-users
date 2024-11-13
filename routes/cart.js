const express = require("express");
const router = express();
const middleware = require('../middleware/auth')

const {
    addItem,
    removeItem,
    all
} = require('../controllers/cart')

router.get("/addItem/:id",middleware, addItem)
router.get("/removeItem/:id",middleware, removeItem)
router.get("/",middleware, all)

module.exports = router;