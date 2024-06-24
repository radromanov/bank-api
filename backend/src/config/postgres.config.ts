import "@shared/utils/dotenv";
import { get } from "env-var";

export class PostgresConfig {
  private static init() {
    return {
      user: get("POSTGRES_USER").required().asString(),
      password: get("POSTGRES_PASSWORD").required().asString(),
      host: get("POSTGRES_HOST").required().asString(),
      port: get("POSTGRES_PORT").required().asPortNumber(),
      database: get("POSTGRES_DB").required().asString(),
      url: get("POSTGRES_URL").required().asString(),
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
