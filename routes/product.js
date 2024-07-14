const express = require("express");
const productController = require("../controller/product/product");
const { getAdminFromToken } = require("../middleware/getAdminFromToken");
const productService = require("../service/product/productService");

const router = express.Router();

router.get("/get",productController.getProduct);
router.post("/create",productService.formatProductService,productController.createProduct)

module.exports = router;