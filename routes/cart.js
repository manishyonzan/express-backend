const express = require("express");
const { getUserFromToken } = require("../middleware/getUserFromToken");

const router = express.Router();
router.get("/get",getUserFromToken,);
router.post("/create", getUserFromToken,);
router.patch("update", getUserFromToken,);
router.delete("/delete",getUserFromToken,)


module.exports = router