import express, { Request, Response } from "express";
const router = express.Router();
const { authenticateToken } = require("../../api/handler/middleware/auth");
const { AuthController } = require("../../api/controller/AuthController");
const { validateError } = require("../../api/handler/rules/validateError");
const {
  authRegisterRule,
  authLoginRule,
} = require("../../api/handler/rules/auth");

const authContext = new AuthController();

router.post("/signup", authRegisterRule, validateError, authContext.register);
router.post("/signin", authLoginRule, validateError, authContext.login);

module.exports = router;