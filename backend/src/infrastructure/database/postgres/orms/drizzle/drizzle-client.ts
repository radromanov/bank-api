import { Sql } from "postgres";
import { DatabaseClient } from "@infrastructure/database/database-client";
import { PostgresJsDatabase, drizzle } from "drizzle-orm/postgres-js";
import * as schema from "./schema";

export class DrizzleClient implements DatabaseClient {
  private _client: PostgresJsDatabase<typeof schema>;

  constructor(private readonly sql: Sql<{}>) {
    this._client = drizzle(this.sql, { schema, logger: true });
  }

  get client() {
    return this._client;
  }
}
