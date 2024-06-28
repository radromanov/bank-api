import { eq } from "drizzle-orm";
import { PostgresJsDatabase } from "drizzle-orm/postgres-js";

import { ApiError } from "@shared/utils";

import { User, UserRepository } from "@domain/user";

import { DrizzleSchema, usersTable } from "@infrastructure/database";
import { RegisterDTO } from "@application/auth";

export class DrizzleUserRepositoryImpl implements UserRepository {
  constructor(
    private readonly drizzleClient: PostgresJsDatabase<DrizzleSchema>
  ) {}

  async save(user: RegisterDTO): Promise<void> {
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

      if (!result) {
        return null;
      }

      const user = User.safeParse(result);
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

      if (!result) {
        return null;
      }

      const user = User.safeParse(result);
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

  async getUserId(email: string): Promise<{ id: string } | null> {
    try {
      const result = await this.drizzleClient
        .select({ id: usersTable.id })
        .from(usersTable)
        .where(eq(usersTable.email, email))
        .then((result) => result[0]);

      if (!result || !result.id) {
        return null;
      }

      return result;
    } catch (error) {
      if (error instanceof ApiError) {
        console.log(error.message);
      } else console.log(error);

      return null;
    }
  }
}
