const express = require("express");
const productController = require("../controller/product/product");
const { getAdminFromToken } = require("../middleware/getAdminFromToken");
const productService = require("../service/product/productService");
const { getUserFromToken } = require("../middleware/getUserFromToken");
const orderController = require("../controller/order/order");
const { rateLimiter } = require("../middleware/rateLimitter");

const router = express.Router();

router.get("/get", rateLimiter, productController.getProduct);
router.post("/create", getAdminFromToken, productService.formatProductService, productController.createProduct)
router.delete("/delete/:productId", getUserFromToken, productController.deleteProduct);
router.patch("/update/:productId", getAdminFromToken, productController.updateProduct);
router.get("/email", orderController.sendMessage);

module.exports = router;