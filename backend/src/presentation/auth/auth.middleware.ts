import { ApiError } from "@shared/utils";
import { RefreshTokenUseCase, VerifyJWTUseCase } from "@application/auth";
import { Request, Response, NextFunction } from "express";

export class AuthMiddleware {
  constructor(
    private readonly verifyJwt: VerifyJWTUseCase,
    private readonly refreshToken: RefreshTokenUseCase
  ) {}

  isAuthed = async (req: Request, res: Response, next: NextFunction) => {
    const bearer = req.headers.authorization;

    // Bearer token doesn't exist or is not in valid format
    if (!bearer || !bearer.startsWith("Bearer ")) {
      // Fallback to looking for a refresh token
      return await this.handleUnauthorized(req, res, next);
    }

    // Get the token value
    const token = bearer.split(" ")[1];

    try {
      await this.verifyJwt.execute(token);

      next();
    } catch (error) {
      return await this.handleUnauthorized(req, res, next);
    }
  };

  private handleUnauthorized = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const refresh = req.cookies["refresh_token"];
    if (!refresh) {
      console.warn("No refresh token found, user needs to log in.");
      return next(ApiError.FORBIDDEN("Please log in before continuing"));
    }

    console.log(
      "Found refresh token in cookies, generating a new access token..."
    );
    try {
      const newAccessToken = await this.refreshToken.execute(refresh);
      res.setHeader("Authorization", `Bearer ${newAccessToken}`);

      await this.verifyJwt.execute(newAccessToken);
      next();
    } catch (error) {
      console.error("Failed to refresh token", error);
      if (error instanceof ApiError) {
        next(error);
      } else {
        next(ApiError.INTERNAL_SERVER_ERROR());
      }
    }
  };
}
