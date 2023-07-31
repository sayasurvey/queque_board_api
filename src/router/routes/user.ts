import express from "express";
import { UserController } from "../../api/controller/UserController";
const router = express.Router();
const tokenVerify = require("../../middleware/tokenVerify");

const userContext = new UserController();

router.get("/users", tokenVerify, userContext.allUser);
router.put("/user/:id", tokenVerify, userContext.putUser);
router.get("/user/:id", tokenVerify, userContext.showUser);
router.delete("/user/:id", tokenVerify, userContext.deleteUser);

module.exports = router;
