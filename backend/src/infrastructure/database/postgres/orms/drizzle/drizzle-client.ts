import { Sql } from "postgres";
import { PostgresJsDatabase, drizzle } from "drizzle-orm/postgres-js";

import * as schema from "./schema";
import { DatabaseClient } from "@infrastructure/database";

export type DrizzleSchema = typeof schema;

export class DrizzleClient implements DatabaseClient {
  private _client: PostgresJsDatabase<DrizzleSchema>;

  constructor(private readonly sql: Sql<{}>) {
    this._client = drizzle(this.sql, { schema, logger: true });
  }

  get client() {
    return this._client;
  }
}
