import "@shared/utils/dotenv";

import z, { ZodError } from "zod";

import { ApiError, minimum, required } from "@shared/utils";

export class BankApiConfig {
  private static schema = z.object({
    port: z
      .string(required("process.env.BANK_API_PORT"))
      .min(1, minimum("process.env.BANK_API_PORT"))
      .transform((data) => parseInt(data, 10)),
    host: z
      .string(required("process.env.BANK_API_HOST"))
      .min(1, minimum("process.env.BANK_API_HOST")),
    env: z.enum(
      ["development", "production", "staging", "testing"],
      required("process.env.NODE_ENV")
    ),
  });

  private static init() {
    try {
      return this.schema.parse({
        port: process.env.BANK_API_PORT,
        host: process.env.BANK_API_HOST,
        env: process.env.NODE_ENV,
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
    return BankApiConfig.init();
  }

  static getOne<T extends keyof ReturnType<typeof BankApiConfig.get>>(key: T) {
    return BankApiConfig.get()[key];
  }
}
