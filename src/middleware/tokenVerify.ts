import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from "dotenv";
import {
  errorHandler,
  CustomException
} from "../api/handler/exception/customError";

dotenv.config();

const jwtSecret = process.env.JWT_SECRET_KEY || "";
import { prismaContext } from "../lib/prismaContext";

// JWTのデコードとユーザー確認を行うミドルウェア
const tokenVerify = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      throw new CustomException(401, 'Authentication is required', "info");
    }

    const decode = await tokenDecode(token);
    
    if (!decode) {
      throw new CustomException(401, 'The token is invalid', "warn");
    }
    
    const { email } = decode
    const user = await prismaContext.user.findUniqueOrThrow({ where: { email } })
                                         .catch(() => { 
                                          throw new CustomException(401, 'User not found', "info") 
                                         });

  } catch (error: any) {
    return next(errorHandler(error, res));
  }
  next();
};

const tokenDecode = (token: string): JwtPayload | null => {
  try {
    const decodedToken = jwt.verify(token, jwtSecret) as JwtPayload;
    return decodedToken;
  } catch (error) {
    return null;
  }
};

export = tokenVerify;