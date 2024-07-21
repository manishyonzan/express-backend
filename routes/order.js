const express = require("express");
const orderController = require("../controller/order/order");
const { getUserFromToken } = require("../middleware/getUserFromToken");

const router = express.Router();
router.get("/getOrders", getUserFromToken, orderController.getOrder);
router.post("/createOrder", getUserFromToken, orderController.createOrder);
router.delete("/deleteOrder", getUserFromToken, orderController.deleteOrder);
router.delete("/removeProduct/:productId", getUserFromToken, orderController.removeProductFromOrder);
router.patch("/changeproduct/:productId",getUserFromToken,orderController.changeProductquantity);

module.exports = router;