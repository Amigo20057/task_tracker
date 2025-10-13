import { NextFunction, Request, Response } from "express";

export const logsRoutes = (req: Request, res: Response, next: NextFunction) => {
  console.log(req.url);
  next();
};
