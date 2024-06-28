import { AuthService } from "@domain/auth";

export class RefreshTokenUseCase {
  constructor(private readonly authService: AuthService) {}

  async execute(refresh: string) {
    return this.authService.refreshToken(refresh);
  }
}
