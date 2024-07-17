const express = require("express");
const productController = require("../controller/product/product");
const { getAdminFromToken } = require("../middleware/getAdminFromToken");
const productService = require("../service/product/productService");
const { getUserFromToken } = require("../middleware/getUserFromToken");

const router = express.Router();

router.get("/get", productController.getProduct);
router.post("/create", getUserFromToken, productService.formatProductService, productController.createProduct)
router.delete("/delete/:productId", getUserFromToken, productController.deleteProduct);

module.exports = router;