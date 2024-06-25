import jwt, { Algorithm } from "jsonwebtoken";
import { FindUserUseCase } from "@application/user";
import { AuthService } from "@domain/auth";
import { JWTConfig } from "@config/jwt.config";
import { ApiError } from "@shared/utils/api-error";

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

  async login(
    email: string
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const user = await this.findUserUseCase.findByEmail(email);

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
    const refreshToken = this.generateToken(
      { id: user.id, email: user.email },
      "7d"
    );

    return { accessToken, refreshToken };
  }

  generateToken(payload: any, expiresIn: string = "1h"): string {
    return jwt.sign(payload, this.privateKey, {
      algorithm: this.algorithm,
      expiresIn,
    });
  }

  async verifyToken(token: string) {
    try {
      return jwt.verify(token, this.publicKey, {
        algorithms: [this.algorithm],
      });
    } catch (error) {
      throw ApiError.FORBIDDEN("Invalid token");
    }
  }
}
