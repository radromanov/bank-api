import { RegisterDTO } from "@application/auth";
import { User } from "./user.schema";

export interface UserRepository {
  save(dto: RegisterDTO): Promise<void>;
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  getUserId(email: string): Promise<{ id: string } | null>;
}
