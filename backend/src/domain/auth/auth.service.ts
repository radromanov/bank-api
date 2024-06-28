import { JwtPayload } from "jsonwebtoken";

export interface AuthService {
  login: (
    email: string
  ) => Promise<{ accessToken: string; refreshToken: string }>;
  generateToken: (payload: any, expiresIn?: string) => string;
  verifyToken: (token: string) => string | JwtPayload;
  refreshToken: (refresh: string) => Promise<string>;
}
