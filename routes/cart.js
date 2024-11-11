const express = require("express");
const router = express();

const {
    addItem,
    removeItem,
    all
} = require('../controllers/cart')

router.post("/addItem", addItem)
router.post("/removeItem", removeItem)
router.get("/:id", all)

module.exports = router;