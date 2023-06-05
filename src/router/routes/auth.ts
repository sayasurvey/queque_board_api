import express, { Request, Response } from "express";
const router = express.Router();
const { authenticateToken } = require("../../api/handler/middleware/auth");
// import { authen }
const { AuthController } = require("../../api/controller/AuthController");
const { validateError } = require("../../api/handler/rules/validateError");
const {
  authRegisterRule,
  authLoginRule,
} = require("../../api/handler/rules/auth");

const authContext = new AuthController();

router.post("/register", authRegisterRule, validateError, authContext.register);
router.post("/login", authLoginRule, validateError, authContext.login);

router.get("/test", authenticateToken, (_req: Request, res: Response) => {
  return res.status(200).send({
    message: "authenticateToken success",
  });
});

module.exports = router;