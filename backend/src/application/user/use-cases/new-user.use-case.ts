import { UserService } from "@domain/user";
import { NewUserDTO } from "../dtos/new-user.dto";

export class NewUserUseCase {
  constructor(private readonly userService: UserService) {}

  async createOne(dto: NewUserDTO): Promise<void> {
    await this.userService.createUser(dto);
  }
}
