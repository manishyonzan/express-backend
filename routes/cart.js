const express = require("express");
const { getUserFromToken } = require("../middleware/getUserFromToken");
const CartController = require("../controller/order/cartController");

const router = express.Router();
router.get("/get",getUserFromToken,CartController.getCart);
router.post("/create", getUserFromToken,CartController.createCart);
router.patch("update", getUserFromToken,CartController.updateCart);
router.delete("/delete",getUserFromToken,CartController.removeCart);


module.exports = router