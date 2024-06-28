import { RegisterDTO } from "@application/auth";
import { User } from "./user.schema";

export interface UserService {
  createUser(dto: RegisterDTO): Promise<void>;
  getUserByEmail(email: string): Promise<User | null>;
  getUserById(id: string): Promise<User | null>;
  isExists(email: string): Promise<boolean>;
}
