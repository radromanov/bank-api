import { User } from "./user.entity";

export interface UserRepository {
  save(customer: User): Promise<void>;
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  getUserId(email: string): Promise<{ id: string } | null>;
}
