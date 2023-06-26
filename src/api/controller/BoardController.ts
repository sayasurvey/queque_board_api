import { Request, Response } from "express";
import {
  getBoards,
  createBoard,
  existCheckId,
  getBoard,
  updateBoard,
  destroyBoard,
} from "../model/Board";

export class BoardController {
  async allBoard(_req: Request, res: Response): Promise<void> {
    const boards = await getBoards();
    res.status(200).json({
      message: "board get all success",
      boards,
    });
  }

  async postBoard(req: Request, res: Response): Promise<void> {
    try {
      const { title, content, boardImage, userId } = req.body;
      const board = await createBoard(title, content, boardImage, userId);

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
      const id = parseInt(req.params.id);
      const existId = await existCheckId(id);
      console.log({ existId });

      // if (existId === undefined) {
      //   throw new Error("tete");
      // }

      const board = await getBoard(existId);

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
      const id = parseInt(req.params.id);
      const { title, content, boardImage } = req.body;
      const existId = await existCheckId(id);
      const board = await updateBoard(existId, title, content, boardImage);

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
      const id = parseInt(req.params.id);
      const existId = await existCheckId(id);
      const _board = await destroyBoard(existId);

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
