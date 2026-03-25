import { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "../services/tokenService";

export interface JwtPayload {
  id: number;
  email: string;
  role: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

export const authGuard = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ success: false, message: "Access denied. No token provided." });
    return;
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = verifyAccessToken(token) as JwtPayload;
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ success: false, message: "Invalid or expired token." });
  }
};

export const roleGuard = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user || !roles.includes(req.user.role)) {
      res.status(403).json({ success: false, message: "Forbidden. Insufficient permissions." });
      return;
    }
    next();
  };
};
