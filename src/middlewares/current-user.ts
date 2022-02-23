import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

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
      console.log('HEADERS', req.headers);
      const token = req.headers?.authorization.replace('Bearer ', '');
      console.log('JWT', token);
      const payload = verify(
        token,
        JWTKey,
      ) as UserPayload;
      req.currentUser = payload;
    } catch (err) {}
  
    next();
  };
}