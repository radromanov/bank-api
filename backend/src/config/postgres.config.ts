import "@shared/utils/dotenv";
import { get } from "env-var";
import z from "zod";

export class PostgresConfig {
  private static init() {
    return {
      user: get("DB_USER").required().asString(),
      password: get("DB_PASSWORD").required().asString(),
      host: get("DB_HOST").required().asString(),
      port: get("DB_PORT").required().asPortNumber(),
      database: get("DB_NAME").required().asString(),
      url: get("DB_URL").required().asString(),
    };
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
