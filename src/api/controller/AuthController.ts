import { Request, Response } from "express";
const {
  usersGet,
  fetchUserPassword,
  // alreadyUserCheck,
  registerUser,
} = require("../model/Auth");
const { hashingPassword, jwtSign, compareCheck } = require("../service/auth");

export class AuthController {
  async usersGet(_req: Request, res: Response) {
    const allUsers = await usersGet();
    return res.status(200).send({
      message: allUsers,
    });
  }

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

      const token = await jwtSign(email);

      if (!token) throw new Error("not create token");

      res.status(201).json({ token });
    } catch (error: any) {
      res.json({
        message: error.message,
      });
    }
  }
}