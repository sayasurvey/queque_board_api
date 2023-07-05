import { Request, Response } from "express";
import {
  createComment,
  existCheckId,
  getComment,
  updateComment,
  destroyComment

} from "../model/Comment";

export class CommentController {
  async postComment(req: Request, res: Response): Promise<void> {
    try {
      const boardId = parseInt(req.params.id);
      const { content, userId } = req.body;
      const Comment = await createComment(content, userId, boardId);

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
      const boardId = parseInt(req.params.boardId);
      const commentId = parseInt(req.params.commentId);
      const { content, userId } = req.body;
      const existId = await existCheckId(commentId);
      const Comment = await updateComment(existId, content, userId, boardId);

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
      const commentId = parseInt(req.params.commentId);
      const existId = await existCheckId(commentId);
      const _comment = await destroyComment(existId);

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
