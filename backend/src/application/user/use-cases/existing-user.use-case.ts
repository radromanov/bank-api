import { UserService } from "@domain/user";

export class ExistingUserUseCase {
  constructor(private readonly userService: UserService) {}

  async execute(email: string) {
    return this.userService.isExists(email);
  }
}
