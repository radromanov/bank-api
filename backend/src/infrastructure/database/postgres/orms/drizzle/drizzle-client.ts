import { Sql } from "postgres";
import { DatabaseClient } from "@infrastructure/database/database-client";
import { PostgresJsDatabase, drizzle } from "drizzle-orm/postgres-js";
import * as schema from "./schema";
import { eq } from "drizzle-orm";
import { PgTable, PgTableWithColumns } from "drizzle-orm/pg-core";
import { PgColumn } from "drizzle-orm/pg-core";

interface PgTableWithIdColumn
  extends PgTableWithColumns<{
    name: string;
    schema: undefined;
    dialect: "pg";
    columns: { id: PgColumn };
  }> {}

interface PgTableWithEmailColumn
  extends PgTableWithColumns<{
    name: string;
    schema: undefined;
    dialect: "pg";
    columns: { email: PgColumn };
  }> {}

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

  async createOne<T extends PgTable>(payload: any, table: T): Promise<void> {
    await this.client.insert(table).values(payload);
  }

  get client() {
    return this._client;
  }
}
