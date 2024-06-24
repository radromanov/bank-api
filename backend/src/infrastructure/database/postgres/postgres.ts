import postgres, { Sql } from "postgres";
import { PostgresConfig } from "@config/postgres.config";

export class Postgres {
  private _sql: Sql<{}>;

  constructor(postgresConfig: typeof PostgresConfig) {
    this._sql = postgres(postgresConfig.connectionUrl);
  }

  get sql() {
    return this._sql;
  }
}
