import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

export const validateError = (
  req: Request,
  res: Response,
  next: NextFunction
): any => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(442).json({ errors: errors.array() });
  }
  next();
};
