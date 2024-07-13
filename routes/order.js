const express = require("express");
const orderRepository = require("../repository/orderRepository");
const orderController = require("../controller/order/order");
const { getUserFromToken } = require("../middleware/getUserFromToken");

const router = express.Router();
router.get("/getOrders", getUserFromToken, orderController.getOrder);
router.post("/createOrder",getUserFromToken,orderController.createOrder);

module.exports = router;  