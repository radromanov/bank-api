import { Sql } from "postgres";
import { DatabaseClient } from "@infrastructure/database/database-client";
import { PostgresJsDatabase, drizzle } from "drizzle-orm/postgres-js";
import * as schema from "./schema";
import { eq } from "drizzle-orm";
import { PgTable } from "drizzle-orm/pg-core";
import { PgTableWithEmailColumn, PgTableWithIdColumn } from "./drizzle.types";

export class DrizzleClient implements DatabaseClient {
  private _client: PostgresJsDatabase<typeof schema>;

  constructor(private readonly sql: Sql<{}>) {
    this._client = drizzle(this.sql, { schema, logger: true });
  }

  async findById<R, T extends PgTableWithIdColumn>(
    id: string,
    table: T
  ): Promise<R> {
    return (await this.client
      .select()
      .from(table)
      .where(eq(table.id, id))
      .then((result) => result[0])) as R;
  }

  async findByEmail<R, T extends PgTableWithEmailColumn>(
    email: string,
    table: T
  ): Promise<R> {
    return (await this.client
      .select()
      .from(table)
      .where(eq(table.email, email))
      .then((result) => result[0])) as R;
  }

  async create<T extends PgTable>(payload: any, table: T): Promise<void> {
    await this.client.insert(table).values(payload);
  }

  async dropTable<T extends PgTable>(table: T): Promise<void> {
    await this.client.delete(table);
  }

  get client() {
    return this._client;
  }
}
