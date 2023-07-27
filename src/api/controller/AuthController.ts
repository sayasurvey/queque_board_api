import { NextFunction, Request, Response } from "express";
const { fetchUserPassword, registerUser } = require("../model/Auth");
const { hashingPassword, jwtSign, compareCheck } = require("../service/auth");
import {
  errorHandler,
  CustomException,
} from "../handler/exception/customError";

export class AuthController {
  async register(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { name, email, password } = req.body;
    try {
      const hashedPassword = await hashingPassword(password);

      if (!hashedPassword)
        throw new CustomException(500, "failed to hash the password", "error");

      const user = await registerUser(name, email, hashedPassword);

      if (!user)
        throw new CustomException(
          400,
          "this register does not success",
          "info"
        );

      res.status(201).json({
        message: "this register user is success",
        user,
      });
    } catch (error: any) {
      return next(errorHandler(error, res));
    }
  }

  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { email, password } = req.body;
    try {
      const existedUserPassword = await fetchUserPassword(email);

      if (existedUserPassword === null)
        throw new CustomException(
          404,
          "this password does not exist",
          "warning"
        );

      const isMatchUser = await compareCheck(password, existedUserPassword);

      if (isMatchUser === false)
        throw new CustomException(
          500,
          "failed to compare with password",
          "error"
        );

      const token = await jwtSign(email);

      if (!token)
        throw new CustomException(500, "failed to issue token", "error");

      res.cookie("jwtToken", token, { httpOnly: true });
      res.status(201).json({
        message: "login success",
        token,
      });
    } catch (error: any) {
      return next(errorHandler(error, res));
    }
  }

  async logout(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      res.clearCookie("jwtToken", {
        httpOnly: true,
      });

      res.status(200).json({ message: "Logout success" });
    } catch (error) {
      // デフォルトのエラークラスでthrow
      throw new Error("Logout failed");
    }
  }
}
