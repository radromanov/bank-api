import jwt, { Algorithm } from "jsonwebtoken";
import { FindUserUseCase } from "@application/user";
import { AuthService } from "@domain/auth";
import { JWTConfig } from "@config/jwt.config";
import { ApiError } from "@shared/utils/api-error";
import { Token } from "@shared/types/Token";
import { Decoded } from "@shared/types";

/**
 * To use this, you need to generate a private key
 * openssl genpkey -algorithm RSA -out private.key -pkeyopt rsa_keygen_bits:2048
 *
 * And a public key from the private key
 * openssl rsa -pubout -in private.key -out public.key
 */

export class AuthServiceImpl implements AuthService {
  private privateKey: string;
  private publicKey: string;
  private algorithm: Algorithm;

  constructor(private readonly findUserUseCase: FindUserUseCase) {
    this.privateKey = JWTConfig.read("privateKeyPath");
    this.publicKey = JWTConfig.read("publicKeyPath");
    this.algorithm = JWTConfig.getOne("algorithm");
  }

  async login(email: string): Promise<Token> {
    try {
      const user = await this.findUserUseCase.findByEmail(email);

      const access = this.generateToken(
        {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          image: user.image,
          roles: user.roles,
          isVerified: user.isVerified,
          isSuspended: user.isSuspended,
        },
        "1m"
      );

      const refresh = this.generateToken(
        { id: user.id, email: user.email },
        "7d"
      );

      return { access, refresh };
    } catch (error) {
      console.error("Login failed", error);
      if (error instanceof ApiError) {
        throw error;
      }
      throw ApiError.INTERNAL_SERVER_ERROR();
    }
  }

  generateToken(payload: any, expiresIn: string = "1h"): string {
    return jwt.sign(payload, this.privateKey, {
      algorithm: this.algorithm,
      expiresIn,
    });
  }

  verifyToken(token: string) {
    try {
      return jwt.verify(token, this.publicKey, {
        algorithms: [this.algorithm],
      });
    } catch (error) {
      console.warn("Token verification failed", error);
      if (error instanceof ApiError) {
        throw error;
      }
      throw ApiError.FORBIDDEN("Invalid token");
    }
  }

  async refreshToken<T extends Decoded>(refresh: string): Promise<string> {
    const decoded = this.verifyToken(refresh) as T;

    // Check if exp is valid by comparing with current timestamp in milliseconds
    if (this.isExpired(decoded)) {
      throw ApiError.FORBIDDEN("Please sign in before continuing");
    }

    try {
      // Get the user from databse and sign a new access token
      const user = await this.findUserUseCase.findById(decoded.id);
      const accessToken = this.generateToken(
        {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          image: user.image,
          roles: user.roles,
          isVerified: user.isVerified,
          isSuspended: user.isSuspended,
        },
        "1m"
      );

      return accessToken;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }

      throw ApiError.INTERNAL_SERVER_ERROR();
    }
  }

  private isExpired(decoded: Decoded): boolean {
    return decoded.exp < Date.now() / 1000;
  }
}
