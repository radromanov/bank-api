import "@shared/utils/dotenv";
import { ApiError } from "@shared/utils/api-error";
import { minimum, required } from "@shared/utils/zod";
import z, { ZodError } from "zod";

export class PostgresConfig {
  private static schema = z.object({
    user: z.string(required("DB_USER")).min(1, minimum("DB_USER")),
    password: z.string(required("DB_PASSWORD")).min(1, minimum("DB_PASSWORD")),
    host: z.string(required("DB_HOST")).min(1, minimum("DB_HOST")),
    port: z
      .string(required("DB_PORT"))
      .min(1, minimum("DB_PORT"))
      .transform((data) => parseInt(data, 10)),
    database: z.string(required("DB_NAME")).min(1, minimum("DB_NAME")),
    url: z.string(required("DB_URL")).min(1, minimum("DB_URL")),
  });

  private static init() {
    try {
      return this.schema.parse({
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        database: process.env.DB_NAME,
        url: process.env.DB_URL,
      });
    } catch (error) {
      if (error instanceof ZodError) {
        throw ApiError.SERVICE_UNAVAILABLE(error.errors[0].message);
      } else {
        throw ApiError.INTERNAL_SERVER_ERROR();
      }
    }
  }

  static get() {
    return PostgresConfig.init();
  }

  static getOne<T extends keyof ReturnType<typeof PostgresConfig.get>>(key: T) {
    return PostgresConfig.get()[key];
  }

  static get connectionUrl() {
    const { user, password, host, port, database } = PostgresConfig.init();

    return `postgres://${user}:${password}@${host}:${port}/${database}`;
  }
}
