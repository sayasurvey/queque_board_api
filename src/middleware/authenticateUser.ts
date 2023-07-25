import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from "dotenv";
dotenv.config();

const jwtSecret = process.env.JWT_SECRET_KEY || "";

// JWTのデコードとユーザー確認を行うミドルウェア
const authenticateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = "";
    const decode = await tokenDecode(token);

  } catch (error) {
    // デフォルトのエラークラスでthrow
    throw new Error("Logout failed");
  }
  next();
};

const tokenDecode = async (token: string): Promise<JwtPayload> => {
  const decodedToken = await jwt.verify(token, jwtSecret) as JwtPayload;
  return decodedToken;
};

export = authenticateUser;