const express = require("express");
const router = express();
const middleware = require('../middleware/auth')

const {
    create,
    cancel,
    all,
    read
} = require('../controllers/order')

router.post("/create", middleware, create)
router.delete("/cancel/:id", middleware, cancel)
router.get("/", middleware, all)
router.get("/read/:id", middleware, read)

module.exports = router;