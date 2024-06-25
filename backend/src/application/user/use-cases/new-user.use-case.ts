import { UserService } from "@domain/user";
import { NewUserDTO } from "../dtos/new-user.dto";
import { ApiError } from "@shared/utils/api-error";

export class NewUserUseCase {
  constructor(private readonly customerService: UserService) {}

  async createOne(dto: NewUserDTO): Promise<void> {
    try {
      await this.customerService.createUser(dto);
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw ApiError.INTERNAL_SERVER_ERROR();
    }
  }
}
