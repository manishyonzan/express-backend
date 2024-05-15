const express = require("express");
const loginController = require("../controller/loginController");

const router = express.Router();

router.get("/get", loginController.getLogin);
router.post("/create", loginController.createLogin);
router.post("/login", loginController.checklogin);


module.exports = router;    