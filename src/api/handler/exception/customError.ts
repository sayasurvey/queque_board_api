import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  error: any,
  // req: Request,
  res: Response
  // next: NextFunction
) => {
  error.statusCode = error.statusCode || 500;
  error.message = error.message || null;
  error.logLevel = error.logLevel || null;

  if (error instanceof BadRequestError || error instanceof NotFoundError) {
    return res.status(error.statusCode).json({
      statusCode: error.statusCode,
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

export class BadRequestError extends Error {
  statusCode: number;
  logLevel: string;

  constructor(statusCode: number, message: string, logLevel: string) {
    super(message);
    this.statusCode = statusCode;
    this.logLevel = logLevel;
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }
}

export class UnauthorizedError extends Error {
  statusCode: number;
  logLevel: string;

  constructor(statusCode: number, message: string, logLevel: string) {
    super(message);
    this.statusCode = statusCode;
    this.logLevel = logLevel;
    Object.setPrototypeOf(this, UnauthorizedError.prototype);
  }
}

export class ForbiddenError extends Error {
  statusCode: number;
  logLevel: string;

  constructor(statusCode: number, message: string, logLevel: string) {
    super(message);
    this.statusCode = statusCode;
    this.logLevel = logLevel;
    Object.setPrototypeOf(this, ForbiddenError.prototype);
  }
}

export class NotFoundError extends Error {
  statusCode: number;
  logLevel: string;

  constructor(statusCode: number, message: string, logLevel: string) {
    super(message);
    this.statusCode = statusCode;
    this.logLevel = logLevel;
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}

export class RequestTimeoutError extends Error {
  statusCode: number;
  logLevel: string;

  constructor(statusCode: number, message: string, logLevel: string) {
    super(message);
    this.statusCode = statusCode;
    this.logLevel = logLevel;
    Object.setPrototypeOf(this, RequestTimeoutError.prototype);
  }
}

export class InternalServerError extends Error {
  statusCode: number;
  logLevel: string;

  constructor(statusCode: number, message: string, logLevel: string) {
    super(message);
    this.statusCode = statusCode;
    this.logLevel = logLevel;
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }
}
