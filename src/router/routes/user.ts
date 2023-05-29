import express from "express";
const router = express.Router();
const { UserController } = require("../../api/controller/UserController");

const userContext = new UserController();

router.use("/user/:id", userContext.postuser);
router.use("/user/:id", userContext.showuser);
router.use("/user/:id", userContext.deleteuser);

module.exports = router;