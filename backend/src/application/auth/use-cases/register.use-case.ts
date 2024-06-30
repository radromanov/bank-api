import { RegisterDto } from "@domain/auth";
import { UserService } from "@domain/user";

export class RegisterUseCase {
  constructor(private readonly userService: UserService) {}

  async execute(dto: RegisterDto): Promise<void> {
    await this.userService.createUser(dto);
  }
}
