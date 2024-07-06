const express = require("express");
const orderRepository = require("../repository/orderRepository");

const router = express.Router();
router.get("/getOrders/:id",orderRepository.getOrders);