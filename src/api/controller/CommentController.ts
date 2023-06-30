import { Request, Response } from "express";
import {
  getComments,
  createComment,
  existCheckId,
  getComment,
  updateComment,
  destroyComment,
} from "../model/Comment";

export class CommentController {
  async allComment(_req: Request, res: Response): Promise<void> {
    const Comments = await getComments();
    res.status(200).json({
      message: "Comment get all success",
      Comments,
    });
  }

  async postComment(req: Request, res: Response): Promise<void> {
    try {
      const { title, content, CommentImage, userId } = req.body;
      const Comment = await createComment(title, content, CommentImage, userId);

      res.status(201).json({
        message: "Comment create success",
        Comment,
      });
    } catch (error: any) {
      res.status(401).json({
        message: error.message,
      });
    }
  }

  async showComment(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const existId = await existCheckId(id);

      const Comment = await getComment(existId);

      res.status(201).json({
        message: "Comment sho get success",
        Comment,
      });
    } catch (error: any) {
      res.status(401).json({
        message: error.message,
      });
    }
  }

  async putComment(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const { title, content, CommentImage } = req.body;
      const existId = await existCheckId(id);
      const Comment = await updateComment(existId, title, content, CommentImage);

      res.status(201).json({
        message: "Comment update success",
        Comment,
      });
    } catch (error: any) {
      res.status(401).json({
        message: error.message,
      });
    }
  }

  async deleteComment(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const existId = await existCheckId(id);
      const _Comment = await destroyComment(existId);

      res.status(201).json({
        message: "Comment delete success",
      });
    } catch (error: any) {
      res.status(401).json({
        message: error.message,
      });
    }
  }
}
