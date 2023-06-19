import { Request, Response } from "express";
import { getUsers, updateUser, showUser, destroyUser } from "../model/User";

export class UserController {
  async allUser(_req: Request, res: Response): Promise<void> {
    const users = await getUsers();
    res.status(200).json({
      users,
    });
  }

  async showUser(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.body;
      const user = await showUser(id);
      if (!user) {
        throw new Error("this user does not exist");
      }
      res.status(200).json({
        message: "show user",
        user,
      });
    } catch (error: any) {
      res.status(401).json({
        message: error.message,
      });
    }
  }

  async putUser(req: Request, res: Response): Promise<void> {
    try {
      const { id, name, email, iconImage } = req.body;
      const user = await updateUser(id, name, email, iconImage);
      if (!user) {
        throw new Error("this user does not exist");
      }
      res.status(201).json({
        message: "user update success",
        user,
      });
    } catch (error: any) {
      res.status(401).json({
        message: error.message,
      });
    }
  }

  async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.body;
      const user = await destroyUser(id);
      if (!user) {
        throw new Error("this user does not exist");
      }
      res.status(201).json({
        message: "user delete success",
      });
    } catch (error: any) {
      res.status(401).json({
        message: error.message,
      });
    }
  }
}
