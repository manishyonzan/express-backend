const express = require("express");
const loginController = require("../controller/Authentication/loginController");
const AdminAuthenticationController = require("../controller/Authentication/AdminController");
const { getAdminFromToken } = require("../middleware/getAdminFromToken");

const router = express.Router();

router.get("/get",getAdminFromToken, loginController.getLogin);
router.post("/create", loginController.createLogin);
router.post("/login", loginController.checklogin);
router.post("/admin/create",getAdminFromToken,AdminAuthenticationController.createLogin);
router.post("/admin/login", AdminAuthenticationController.checklogin);

module.exports = router;    