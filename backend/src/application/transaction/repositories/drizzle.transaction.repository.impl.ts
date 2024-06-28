import { TransactionInsertDTO } from "../dtos/new-transaction.dto";
import { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import { DrizzleSchema, transactionsTable } from "@infrastructure/database";
import { PostgresError } from "postgres";
import { ApiError } from "@shared/utils";
import { TransactionRepository } from "@domain/transaction";

export class DrizzleTransactionRepositoryImpl implements TransactionRepository {
  constructor(
    private readonly drizzleClient: PostgresJsDatabase<DrizzleSchema>
  ) {}

  async save(dto: TransactionInsertDTO): Promise<void> {
    try {
      console.log("in drizzle transaction repo", dto);
      await this.drizzleClient.insert(transactionsTable).values(dto);
    } catch (error) {
      if (error instanceof PostgresError) {
        switch (error.code) {
          case "23505":
            // Unique violation
            throw ApiError.CONFLICT("Transaction Conflict");
          case "23503":
            // Foreign key violation
            throw ApiError.BAD_REQUEST("Invalid User Reference");
          case "23502":
            // Not null violation
            throw ApiError.BAD_REQUEST("Missing Required Field");
          default:
            // Handle other PostgreSQL errors
            throw ApiError.INTERNAL_SERVER_ERROR(
              `Database Error: ${error.message}`
            );
        }
      }

      if (error instanceof ApiError) {
        throw error;
      }

      throw ApiError.INTERNAL_SERVER_ERROR();
    }
  }
}
