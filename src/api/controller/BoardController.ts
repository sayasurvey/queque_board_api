import { NextFunction, Request, Response } from "express";
import {
  getBoards,
  createBoard,
  existCheckId,
  getBoard,
  updateBoard,
  destroyBoard,
} from "../model/Board";
import {
  errorHandler,
  BadRequestError,
  NotFoundError,
} from "../handler/exception/customError";

export class BoardController {
  async allBoard(_req: Request, res: Response): Promise<void> {
    const boards = await getBoards();
    res.status(200).json({
      message: "board get all success",
      boards,
    });
  }

  async postBoard(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { title, content, boardImage, userId } = req.body;
      const board = await createBoard(title, content, boardImage, userId);

      if (!board) {
        throw new BadRequestError(400, "this board does not create", "info");
      }
      res.status(201).json({
        message: "this board create is success",
        board,
      });
    } catch (error: any) {
      return next(errorHandler(error, res));
    }
  }

  async showBoard(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const existId = await existCheckId(id);
      if (!existId) {
        throw new NotFoundError(404, "No post found for the given id", "info");
      }

      const board = await getBoard(existId);

      if (!board) {
        throw new BadRequestError(404, "this board does not get", "info");
      }

      res.status(201).json({
        message: "that board get is success",
        board,
      });
    } catch (error: any) {
      return next(errorHandler(error, res));
    }
  }

  async putBoard(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const { title, content, boardImage } = req.body;
      const existId = await existCheckId(id);

      if (!existId) {
        throw new NotFoundError(404, "No board found for the given id", "info");
      }

      const board = await updateBoard(existId, title, content, boardImage);

      if (!board) {
        throw new BadRequestError(400, "this board does not update", "info");
      }

      res.status(201).json({
        message: "that board update success",
        board,
      });
    } catch (error: any) {
      return next(errorHandler(error, res));
    }
  }

  async deleteBoard(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const existId = await existCheckId(id);

      if (!existId) {
        throw new NotFoundError(404, "No post found for the given id", "info");
      }
      const board = await destroyBoard(existId);

      if (!board) {
        throw new BadRequestError(400, "that board does not delete", "info");
      }

      res.status(201).json({
        message: "board delete success",
      });
    } catch (error: any) {
      return next(errorHandler(error, res));
    }
  }
}
