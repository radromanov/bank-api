import { AuthService } from "@domain/auth";

export class LoginUseCase {
  constructor(private readonly authService: AuthService) {}
}
