import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "./schema";
import { PostgresConfig } from "@infrastructure/config/postgres.config";

const { user, password, host, port, database } = PostgresConfig.get();

export const sql = postgres(
  `postgres://${user}:${password}@${host}:${port}/${database}`,
);
export const db = drizzle(sql, { schema });
