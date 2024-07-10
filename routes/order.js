const express = require("express");
const orderRepository = require("../repository/orderRepository");
const orderController = require("../controller/order/order");
const { getUserFromToken } = require("../middleware/getUserFromToken");

const router = express.Router();
router.get("/getOrders/:id", getUserFromToken, orderController.getOrder);

module.exports = router;  