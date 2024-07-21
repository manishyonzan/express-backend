const express = require("express");
const { getUserFromToken } = require("../middleware/getUserFromToken");
const WishlistController = require("../controller/order/wishlistController");

const router = express.Router();
router.get("/get",getUserFromToken,WishlistController.getWishList);
router.post("/create", getUserFromToken,WishlistController.createWishList);
router.patch("update", getUserFromToken,WishlistController.updateWishList);
router.delete("/delete",getUserFromToken,WishlistController.removeWishlist);


module.exports = router