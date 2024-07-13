const express = require("express");
const productController = require("../controller/product/product");

const router = express.Router();

router.get("/get",productController.getProduct)

module.exports = router;