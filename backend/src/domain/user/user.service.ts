import { User } from "./user.schema";

import { RegisterDto } from "@domain/auth";

export interface UserService {
  createUser(dto: RegisterDto): Promise<void>;
  getUserByEmail(email: string): Promise<User | null>;
  getUserById(id: string): Promise<User | null>;
  isExists(email: string): Promise<boolean>;
}
