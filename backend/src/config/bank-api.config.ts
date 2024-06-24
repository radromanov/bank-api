import "@shared/utils/dotenv";
import { get } from "env-var";

export class BankApiConfig {
  private static init() {
    return {
      port: get("BANK_API_PORT").required().asPortNumber(),
      host: get("BANK_API_HOST").required().asString(),
      env: get("NODE_ENV")
        .required()
        .asEnum(["development", "production", "staging", "testing"]),
    };
  }

  static get() {
    return BankApiConfig.init();
  }

  static getOne<T extends keyof ReturnType<typeof BankApiConfig.get>>(key: T) {
    return BankApiConfig.get()[key];
  }
}
