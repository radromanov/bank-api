import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "./schema";
import { PostgresConfig } from "@config/postgres.config";

const { user, password, host, port, database } = PostgresConfig.get();

export const sql = postgres(
  `postgres://${user}:${password}@${host}:${port}/${database}`,
  { max: 1 }
);
export const db = drizzle(sql, { schema, logger: true });
