
const express = require("express");
const reviewController = require("../controller/product/review");
const { getUserFromToken } = require("../middleware/getUserFromToken");

const router = express.Router();

router.get("/get", reviewController.getReview);
router.post("/create", getUserFromToken, reviewController.createReview);
router.patch("/patch",getUserFromToken,reviewController.updateReview);
router.delete("/delete",getUserFromToken,reviewController.deleteReview);

module.exports  = router;