import { NextFunction, Request, Response } from "express";
import {
  getBoards,
  createBoard,
  getBoard,
  updateBoard,
  destroyBoard,
} from "../model/Board";
import {
  errorHandler,
  BadRequestError,
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
    const { title, content, boardImage, userId } = req.body;
    try {
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

      const board = await getBoard(id);

      if (!board) {
        throw new BadRequestError(400, "this board does not get", "info");
      }

      res.status(201).json({
        message: "this board get is success",
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
    const { title, content, boardImage } = req.body;
    try {
      const id = parseInt(req.params.id);

      const board = await updateBoard(id, title, content, boardImage);

      if (!board) {
        throw new BadRequestError(400, "this board does not update", "info");
      }

      res.status(201).json({
        message: "this board update success",
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

      const board = await destroyBoard(id);

      if (!board) {
        throw new BadRequestError(400, "this board does not delete", "info");
      }

      res.status(201).json({
        message: "this board delete is success",
      });
    } catch (error: any) {
      return next(errorHandler(error, res));
    }
  }
}
