import { UserService } from "@domain/user";

import { RegisterDTO } from "@application/auth";

export class RegisterUseCase {
  constructor(private readonly userService: UserService) {}

  async execute(dto: RegisterDTO): Promise<void> {
    await this.userService.createUser(dto);
  }
}
