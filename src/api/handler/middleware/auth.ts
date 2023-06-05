import { NextFunction, Request, Response } from "express";
import { prismaContext } from "../../../lib/prismaContext";
const jwt = require("jsonwebtoken");
import dotenv from "dotenv";
dotenv.config();

const jwtSecret = process.env.JWT_SECRET_KEY || "";

export const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new Error("401 authorization not");
    }

    // token bearer is split
    const token = authHeader.split(" ")[1];

    const payload = await verifyToken(token);

    const user = prismaContext.user.findUnique({
      where: {
        email: payload.email,
      },
      select: {
        id: true,
      },
    });

    if (!user) {
      throw new Error("authenticate not");
    }

    next();
  } catch (error: any) {
    res.json({
      message: error.message,
    });
  }
};

const verifyToken = async (token: string) => {
  const decodedToken = jwt.verify(token, jwtSecret);
  return decodedToken;
};