import express from "express";
const router = express.Router();
import { UserController } from "../../api/controller/UserController";

const userContext = new UserController();

router.use("/user/:id", userContext.putUser);
router.use("/user/:id", userContext.showUser);
router.use("/user/:id", userContext.deleteUser);

module.exports = router;
