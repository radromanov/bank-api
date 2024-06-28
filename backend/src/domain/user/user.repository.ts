import { User, UserInsert } from "./user.schema";

export interface UserRepository {
  save(user: UserInsert): Promise<void>;
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  getUserId(email: string): Promise<{ id: string } | null>;
}
