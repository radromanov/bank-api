import { User } from "./user.schema";

import { RegisterDto } from "@domain/auth";

export interface UserRepository {
  save(dto: RegisterDto): Promise<void>;
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  getUserId(email: string): Promise<{ id: string } | null>;
}
