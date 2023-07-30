import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from "dotenv";
import { PrismaClient } from '@prisma/client';
import {
  errorHandler,
  CustomException
} from "../api/handler/exception/customError";

dotenv.config();

const jwtSecret = process.env.JWT_SECRET_KEY || "";
const prisma = new PrismaClient();

// JWTのデコードとユーザー確認を行うミドルウェア
const authenticateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      throw new CustomException(401, 'Authentication is required', "info");
    }

    const decode = await tokenDecode(token);
    const { email } = decode

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      throw new CustomException(401, 'User not found', "info");
    }

  } catch (error: any) {
    return next(errorHandler(error, res));
  }
  next();
};

const tokenDecode = async (token: string): Promise<JwtPayload> => {
  let decodedToken: JwtPayload;

  try {
    decodedToken = await jwt.verify(token, jwtSecret) as JwtPayload;
  } catch (error: any){
    throw new CustomException(401, 'The token is invalid', "warn");
  }
  
  return decodedToken;
};

export = authenticateUser;