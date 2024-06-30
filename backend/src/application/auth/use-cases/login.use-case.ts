import { AuthService, LoginDto } from "@domain/auth";

export class LoginUseCase {
  constructor(private readonly authService: AuthService) {}

  async execute(dto: LoginDto) {
    return await this.authService.login(dto.email);
  }
}
