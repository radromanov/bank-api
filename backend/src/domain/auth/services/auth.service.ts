import { Token } from "@shared/types";
import { JwtPayload } from "jsonwebtoken";

export interface AuthService {
  login: (email: string) => Promise<Token>;
  generateToken: (payload: any, expiresIn?: string) => string;
  verifyToken: (token: string) => string | JwtPayload;
  refreshToken: (refresh: string) => Promise<string>;
}
