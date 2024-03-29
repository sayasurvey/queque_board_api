import { NextFunction, Request, Response } from "express";
import {
  errorHandler,
  CustomException,
} from "../handler/exception/customError";
import {
  getBookmark,
  createBookmark,
  destroyBookmark,
  findExistedBookmark,
} from "../model/Bookmark";

export class BookmarkController {
  async getUserBookmark(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const user_id = parseInt(req.params.user_id);
      const bookmark = await getBookmark(user_id);

      if (!bookmark) {
        throw new CustomException(400, "this bookmarks done not get", "info");
      }

      res.status(200).json({
        message: "this bookmarks get is success",
        bookmark,
      });
    } catch (error: any) {
      return next(errorHandler(error, res));
    }
  }

  async postBookmark(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const board_id = req.body;
    try {
      const user_id = parseInt(req.params.user_id);

      const existedBookmark = await findExistedBookmark(
        user_id,
        board_id.boardId
      );

      if (existedBookmark) {
        throw new CustomException(400, "this bookmark is existed", "info");
      }

      const bookmark = await createBookmark(user_id, board_id.boardId);

      if (!bookmark) {
        throw new CustomException(400, "this bookmark done not create", "info");
      }

      res.status(201).json({
        message: "this bookmark create is success",
        bookmark,
      });
    } catch (error: any) {
      return next(errorHandler(error, res));
    }
  }

  async deleteBookmark(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const bookmark_id = parseInt(req.params.bookmark_id);
      const bookmark = await destroyBookmark(bookmark_id);

      if (!bookmark) {
        throw new CustomException(400, "this bookmark done not delete", "info");
      }

      res.status(201).json({
        message: "this bookmark delete is success",
        bookmark,
      });
    } catch (error: any) {
      return next(errorHandler(error, res));
    }
  }
}