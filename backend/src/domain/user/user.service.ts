import { User } from "./user.entity";
import { NewUserDTO } from "@application/user";

export interface UserService {
  createUser(dto: NewUserDTO): Promise<void>;
  getUserByEmail(email: string): Promise<User | null>;
  getUserById(id: string): Promise<User | null>;
  isExists(email: string): Promise<boolean>;
}
