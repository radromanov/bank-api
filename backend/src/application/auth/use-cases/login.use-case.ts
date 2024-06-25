import { AuthService } from "@domain/auth";
import { LoginDTO } from "../dtos";

export class LoginUseCase {
  constructor(private readonly authService: AuthService) {}

  async execute(dto: LoginDTO) {
    return await this.authService.login(dto.email);
  }
}
