import { AuthService } from "@domain/auth";

export class VerifyJWTUseCase {
  constructor(private readonly authService: AuthService) {}

  async execute(token: string) {
    return this.authService.verifyToken(token);
  }
}
