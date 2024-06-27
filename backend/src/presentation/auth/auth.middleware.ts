import { VerifyJWTUseCase } from "@application/auth/use-cases/verify-jwt.use-case";
import { ApiError } from "@shared/utils";
import { Request, Response, NextFunction } from "express";

export class AuthMiddleware {
  constructor(private readonly verifyJwt: VerifyJWTUseCase) {}

  isAuthed = async (req: Request, _res: Response, next: NextFunction) => {
    const bearer = req.headers.authorization;

    if (!bearer || !bearer.startsWith("Bearer ")) {
      // Fallback to looking for a refresh token
      return this.handleUnauthorized(req, next);
    }
    // Get the token value
    const token = bearer.split(" ")[1];

    try {
      await this.verifyJwt.execute(token);

      next();
    } catch (error) {
      return this.handleUnauthorized(req, next);
    }
  };

  private handleUnauthorized = (req: Request, next: NextFunction) => {
    const refresh = req.cookies["refresh_token"];
    if (!refresh) {
      return next(ApiError.FORBIDDEN("Please log in before continuing"));
    }
    // TODO: Add logic to refresh the access token using the refresh token
    // Example: const newAccessToken = await this.refreshToken(refresh);
    // res.setHeader('Authorization', `Bearer ${newAccessToken}`);
    // await this.verifyJwt.execute(newAccessToken);
  };
}
