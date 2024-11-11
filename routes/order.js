const express = require("express");
const router = express();

const {
    create,
    cancel,
    all
} = require('../controllers/order')

router.post("/create", create)
router.delete("/cancel/:id", cancel)
router.get("/:id", all)

module.exports = router;