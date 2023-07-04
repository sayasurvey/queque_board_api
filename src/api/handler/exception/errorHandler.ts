import { Request, Response, NextFunction } from "express";
import {
  BadRequestError,
  NotFoundError,
  InternalServerError,
} from "./customError";

export const errorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  error.statusCode = error.statusCode || 500;
  error.message = error.message || null;
  error.logLevel = error.logLevel || null;

  if (error instanceof BadRequestError || error instanceof NotFoundError) {
    return res.status(error.statusCode).json({
      message: error.message,
      logLevel: error.logLevel,
    });
  } else {
    res.status(500).json({
      message: "internal server error",
      logLevel: "error",
    });
  }
};
