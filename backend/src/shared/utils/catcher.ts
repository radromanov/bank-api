import { Request, Response, NextFunction } from "express";

export const catcher =
  (callback: (req: Request, res: Response) => Promise<void>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await callback(req, res);
    } catch (error) {
      next(error);
    }
  };
