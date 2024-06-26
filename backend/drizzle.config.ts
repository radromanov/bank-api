import { PostgresConfig } from "config/postgres.config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/infrastructure/database/postgres/orms/drizzle/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: PostgresConfig.connectionUrl,
  },
  verbose: true,
  strict: true,
});
