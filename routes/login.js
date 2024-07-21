const express = require("express");
const loginController = require("../controller/Authentication/loginController");
const AdminAuthenticationController = require("../controller/Authentication/AdminController");

const router = express.Router();

router.get("/get", loginController.getLogin);
router.post("/create", loginController.createLogin);
router.post("/login", loginController.checklogin);
router.post("/admin/create",AdminAuthenticationController.createLogin);
router.post("/admin/login", AdminAuthenticationController.checklogin);


module.exports = router;    