const express = require("express");
const Controller = require("../controllers/userController");
const router = express.Router();
const authentication = require("../middleware/authentication");

router.post("/login", Controller.login);

router.use(authentication);

router.post("/register", Controller.register);

module.exports = router;
