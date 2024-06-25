import { eq } from "drizzle-orm";
import { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import { usersTable } from "@infrastructure/database/postgres/orms/drizzle/schema";
import { ApiError } from "@shared/utils/api-error";
import * as schema from "@infrastructure/database/postgres/orms/drizzle/schema";
import { User, UserRepository, UserSchema } from "@domain/user";

export class DrizzleUserRepositoryImpl implements UserRepository {
  constructor(
    private readonly drizzleClient: PostgresJsDatabase<typeof schema>
  ) {}

  async save(user: User): Promise<void> {
    try {
      await this.drizzleClient.insert(usersTable).values(user);
    } catch (error) {
      console.log(error);
    }
  }
  async findById(id: string): Promise<User | null> {
    try {
      const result = await this.drizzleClient
        .select()
        .from(usersTable)
        .where(eq(usersTable.id, id))
        .then((result) => result[0]);

      const user = UserSchema.safeParse(result);
      if (!user.success) {
        throw ApiError.UNPROCESSABLE_ENTITY(
          user.error.errors[0].message || "Invalid customer result"
        );
      }

      return user.data;
    } catch (error) {
      if (error instanceof ApiError) {
        console.log(error.message);
      } else console.log(error);

      return null;
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    try {
      const result = await this.drizzleClient
        .select()
        .from(usersTable)
        .where(eq(usersTable.email, email))
        .then((result) => result[0]);

      const user = UserSchema.safeParse(result);
      if (!user.success) {
        throw ApiError.UNPROCESSABLE_ENTITY(
          user.error.errors[0].message || "Invalid customer result"
        );
      }
      return user.data;
    } catch (error) {
      if (error instanceof ApiError) {
        console.log(error.message);
      } else console.log(error);

      return null;
    }
  }
}
