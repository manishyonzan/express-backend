const express = require("express");
const orderRepository = require("../repository/orderRepository");
const orderController = require("../controller/order/order");

const router = express.Router();
router.get("/getOrders/:id",orderController.getOrder);

module.exports = router;  