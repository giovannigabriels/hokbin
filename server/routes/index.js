const express = require("express");
const router = express.Router();
const userRouter = require("./userRouter");
const itemRouter = require("./itemRouter");
const categoryRouter = require("./categoryRouter");
const authentication = require("../middleware/authentication");

router.use("/users", userRouter);
router.use("/pub/items", itemRouter);

// authentication
router.use(authentication);

router.use("/items", itemRouter);
router.use("/categories", categoryRouter);

module.exports = router;
