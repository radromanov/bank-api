import { NewUserDTO } from "../dtos/new-user.dto";
import { ApiError } from "@shared/utils";
import { User, UserRepository, UserService } from "@domain/user";

export class UserServiceImpl implements UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(dto: NewUserDTO): Promise<void> {
    const exists = await this.userRepository.getUserId(dto.email);

    if (exists) {
      throw ApiError.CONFLICT("User already exists");
    }

    const user = new User(
      dto.id,
      dto.email,
      dto.firstName,
      dto.lastName,
      dto.image
    );

    await this.userRepository.save(user);
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
