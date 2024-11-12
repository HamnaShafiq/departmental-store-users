const express = require("express");
const router = express();
const middleware = require('../middleware/auth')

const {
    create,
    cancel,
    all
} = require('../controllers/order')

router.post("/create", middleware, create)
router.delete("/cancel/:id", middleware, cancel)
router.get("/:id", middleware, all)

module.exports = router;