import express from "express";
const router = express.Router();
import { UserController } from "../../api/controller/UserController";

const userContext = new UserController();

router.get("/users", userContext.allUser);
router.put("/user/:id", userContext.putUser);
router.get("/user/:id", userContext.showUser);
router.delete("/user/:id", userContext.deleteUser);

module.exports = router;
