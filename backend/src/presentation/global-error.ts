import { ApiError } from "@shared/utils/api-error";
import { Request, Response, NextFunction } from "express";

export const globalError = (
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (error instanceof ApiError) {
    res.status(error.status).json({
      message: error.message,
      status: error.status,
      trace: error.trace,
    });
  } else {
    res.status(500).json({
      message: "Internal Server Error",
      status: 500,
      trace: null,
    });
  }
};
