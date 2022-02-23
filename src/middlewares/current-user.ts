import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { AutenticationTokenError } from '../errors/authentication-token-error';

interface UserPayload {
  userId: string;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}

export const currentUser = (JWTKey: string) => {
  return (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    
    if (!req.headers?.authorization) {
      return next();
    }
  
    try {
      const token = req.headers?.authorization.replace('Bearer ', '');
      const payload = verify(
        token,
        JWTKey,
      ) as UserPayload;
      req.currentUser = payload;
    } catch (err) {
      throw new AutenticationTokenError();
    }
  
    next();
  };
}