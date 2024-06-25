import { User, UserService } from "@domain/user";
import { ApiError } from "@shared/utils/api-error";

export class FindUserUseCase {
  constructor(private readonly userService: UserService) {}

  async findById(id: string): Promise<User> {
    try {
      const user = await this.userService.getUserById(id);

      if (!user) {
        throw ApiError.NOT_FOUND(`User with ID ${id} not found`);
      }

      return user;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }

      throw ApiError.INTERNAL_SERVER_ERROR();
    }
  }

  async findByEmail(email: string): Promise<User> {
    try {
      const user = await this.userService.getUserByEmail(email);

      if (!user) {
        throw ApiError.NOT_FOUND(`User with email ${email} not found`);
      }

      return user;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }

      throw ApiError.INTERNAL_SERVER_ERROR();
    }
  }
}
