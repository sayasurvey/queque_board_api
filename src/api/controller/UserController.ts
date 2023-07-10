import { NextFunction, Request, Response } from "express";
import { getUsers, updateUser, getUser, destroyUser } from "../model/User";
import {
  errorHandler,
  CustomException,
} from "../handler/exception/customError";

export class UserController {
  async allUser(_req: Request, res: Response): Promise<void> {
    const users = await getUsers();

    res.status(200).json({
      message: "user get all success",
      users,
    });
  }

  async showUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const id = parseInt(req.params.id);
    try {
      const user = await getUser(id);

      if (!user) {
        throw new CustomException(404, "this users does not get", "info");
      }
      res.status(200).json({
        message: "this user get success",
        user,
      });
    } catch (error: any) {
      return next(errorHandler(error, res));
    }
  }

  async putUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { name, email, iconImage } = req.body;
    try {
      const id = parseInt(req.params.id);

      const user = await updateUser(id, name, email, iconImage);

      if (!user)
        throw new CustomException(400, "this user does not update", "info");

      res.status(201).json({
        message: "this user update is success",
        user,
      });
    } catch (error: any) {
      return next(errorHandler(error, res));
    }
  }

  async deleteUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const id = parseInt(req.params.id);

      const user = await destroyUser(id);

      if (!user)
        throw new CustomException(400, "this user does not delete", "info");

      res.status(201).json({
        message: "this user delete is success",
      });
    } catch (error: any) {
      return next(errorHandler(error, res));
    }
  }
}
