const express = require("express");
const couponController = require("../controller/order/couponController");
const { getAdminFromToken } = require("../middleware/getAdminFromToken");


const router = express.Router();

router.get("/get",couponController.getCoupon);
router.get("/:id",getAdminFromToken,couponController.getSingleCoupon);
router.post("/create",getAdminFromToken,couponController.createCoupon);
router.patch("/update",getAdminFromToken,couponController.updateCoupon);
router.delete("/delete",getAdminFromToken,couponController.removeCoupon);

module.exports = router;