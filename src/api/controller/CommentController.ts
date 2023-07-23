import { NextFunction, Request, Response } from "express";
import {
  createComment,
  updateComment,
  destroyComment
} from "../model/Comment";
import {
  errorHandler,
  CustomException,
} from "../handler/exception/customError";

export class CommentController {
  async postComment(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { content, userId } = req.body;

    try {
      const boardId = parseInt(req.params.id);
      const comment = await createComment(content, userId, boardId);

      if (!comment)
        throw new CustomException(400, "this comment does not create", "info");

      res.status(201).json({
        message: "this comment create is success",
        comment,
      });

    } catch (error: any) {
      return next(errorHandler(error, res));
    }
  }

  async putComment(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { content, userId } = req.body;

    try {
      const boardId = parseInt(req.params.boardId);
      const commentId = parseInt(req.params.commentId);
      const comment = await updateComment(commentId, content, userId, boardId);

      if (!comment)
        throw new CustomException(400, "this comment does not update", "info");

      res.status(201).json({
        message: "this comment update success",
        comment,
      });

    } catch (error: any) {
      return next(errorHandler(error, res));
    }
  }

  async deleteComment(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const commentId = parseInt(req.params.commentId);
      const comment = await destroyComment(commentId);

      if (!comment)
        throw new CustomException(400, "this comment does not delete", "info");

        res.status(201).json({
          message: "this comment delete is success",
      });
      
    } catch (error: any) {
      return next(errorHandler(error, res))
    }
  }
}
