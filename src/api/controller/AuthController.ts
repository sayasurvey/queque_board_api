import { Request, Response } from "express";
const {
  fetchUserPassword,
  registerUser,
} = require("../model/Auth");
const { hashingPassword, jwtSign, compareCheck } = require("../service/auth");

export class AuthController {
  async register(req: Request, res: Response): Promise<void> {
    try {
      const hashedPassword = await hashingPassword(req.body.password);

      const user = await registerUser(req.body, hashedPassword);

      if (!user) throw new Error("not register user");

      res.status(201).json({ user });
    } catch (error: any) {
      res.json({
        message: error.message,
      });
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;

      const existedUserPassword = await fetchUserPassword(email);

      if (existedUserPassword === null) throw new Error("not exited user");

      const isMatchUser = await compareCheck(password, existedUserPassword);

      if (isMatchUser === false) {
        throw new Error("not compare password");
      }

      const token = await jwtSign({ email });

      if (!token) throw new Error("not create token");

      res.status(201).json({ token });
    } catch (error: any) {
      res.json({
        message: error.message,
      });
    }
  }

  async logout(req: Request, res: Response): Promise<void> {
    try {
      console.log(req);
      res.clearCookie("jwtToken", {
        httpOnly: true,
        expires: new Date(Date.now() + 86400000), // 1日後の有効期限
      });
  
      res.status(200).json({ message: "Logout success" });
    } catch (error) {
      console.log(error);
    }
  }
}
