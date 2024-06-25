import { NewUserDTO } from "@application/user/dtos/new-user.dto";
import { User } from "./user.entity";

export interface UserService {
  createUser(dto: NewUserDTO): Promise<void>;
  getUserByEmail(email: string): Promise<User | null>;
  getUserById(id: string): Promise<User | null>;
}
