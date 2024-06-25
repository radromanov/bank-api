import { Customer } from "@domain/customer/customer.entity";
import { CustomerRepository } from "@domain/customer/customer.repository";
import { DrizzleClient } from "@infrastructure/database/postgres/orms/drizzle/drizzle-client";
import { usersTable } from "@infrastructure/database/postgres/orms/drizzle/schema";
import { eq } from "drizzle-orm";
import { ApiError } from "@shared/utils/api-error";
import { CustomerSchema } from "@domain/customer/customer.schema";

export class DrizzleCustomerRepositoryImpl implements CustomerRepository {
  constructor(private readonly drizzleClient: DrizzleClient) {}

  async save(customer: Customer): Promise<void> {
    try {
      await this.drizzleClient.client.insert(usersTable).values(customer);
    } catch (error) {
      console.log(error);
    }
  }
  async findById(id: string): Promise<Customer | null> {
    try {
      const result = await this.drizzleClient.client
        .select()
        .from(usersTable)
        .where(eq(usersTable.id, id))
        .then((result) => result[0]);

      const customer = CustomerSchema.safeParse(result);
      if (!customer.success) {
        throw ApiError.UNPROCESSABLE_ENTITY(
          customer.error.errors[0].message || "Invalid customer result"
        );
      }

      return customer.data;
    } catch (error) {
      if (error instanceof ApiError) {
        console.log(error.message);
      } else console.log(error);

      return null;
    }
  }

  async findByEmail(email: string): Promise<Customer | null> {
    try {
      const result = await this.drizzleClient.client
        .select()
        .from(usersTable)
        .where(eq(usersTable.email, email))
        .then((result) => result[0]);

      const customer = CustomerSchema.safeParse(result);
      if (!customer.success) {
        throw ApiError.UNPROCESSABLE_ENTITY(
          customer.error.errors[0].message || "Invalid customer result"
        );
      }
      return customer.data;
    } catch (error) {
      if (error instanceof ApiError) {
        console.log(error.message);
      } else console.log(error);

      return null;
    }
  }
}
