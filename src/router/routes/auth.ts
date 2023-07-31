import express, { Request, Response } from "express";
const router = express.Router();
const { AuthController } = require("../../api/controller/AuthController");
const { validateError } = require("../../api/handler/rules/validateError");
const tokenVerify = require("../../middleware/tokenVerify");
const {
  authRegisterRule,
  authLoginRule,
} = require("../../api/handler/rules/auth");

const authContext = new AuthController();

router.post("/signup", authRegisterRule, validateError, authContext.register);
router.post("/signin", authLoginRule, validateError, authContext.login);
router.post("/signout", tokenVerify, authContext.logout);

module.exports = router;