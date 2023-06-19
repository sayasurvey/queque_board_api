import { Request, Response } from "express";
import {
  allBoard,
  createBoard,
  getBoard,
  updateBoard,
  destroyBoard,
} from "../model/Board";

export class BoardController {
  async allBoard(_req: Request, res: Response): Promise<void> {
    const boards = await allBoard();
    res.status(200).json({
      message: "board get all success",
      boards,
    });
  }

  async postBoard(req: Request, res: Response): Promise<void> {
    try {
      const { title, body, boardImage, userId } = req.body;
      const board = await createBoard(title, body, boardImage, userId);
      if (!board) {
        throw new Error("this board does not exist");
      }
      res.status(201).json({
        message: "board create success",
        board,
      });
    } catch (error: any) {
      res.status(401).json({
        message: error.message,
      });
    }
  }

  async showBoard(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.body;
      const board = await getBoard(id);

      if (!board) {
        throw new Error("this board does not exist");
      }

      res.status(201).json({
        message: "board update success",
        board,
      });
    } catch (error: any) {
      res.status(401).json({
        message: error.message,
      });
    }
  }

  async putBoard(req: Request, res: Response): Promise<void> {
    try {
      const { id, title, body, boardImage } = req.body;
      const board = await updateBoard(id, title, body, boardImage);
      if (!board) {
        throw new Error("this board does not exist");
      }
      res.status(201).json({
        message: "board update success",
        board,
      });
    } catch (error: any) {
      res.status(401).json({
        message: error.message,
      });
    }
  }

  async deleteBoard(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.body;
      const board = await destroyBoard(id);
      if (!board) {
        throw new Error("this board does not exist");
      }
      res.status(201).json({
        message: "board delete success",
      });
    } catch (error: any) {
      res.status(401).json({
        message: error.message,
      });
    }
  }
}
