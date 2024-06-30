import { ApiError } from "@shared/utils";

import { User, UserRepository, UserService } from "@domain/user";

import { RegisterDto } from "@domain/auth";

export class UserServiceImpl implements UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(dto: RegisterDto): Promise<void> {
    const exists = await this.userRepository.getUserId(dto.email);

    if (exists) {
      throw ApiError.CONFLICT("User already exists");
    }

    await this.userRepository.save(dto);
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return this.userRepository.findByEmail(email);
  }

  async getUserById(id: string): Promise<User | null> {
    return this.userRepository.findById(id);
  }

  async isExists(email: string): Promise<boolean> {
    const result = await this.userRepository.getUserId(email);

    if (!result || !result.id) return false;
    return true;
  }
}
