import z, { ZodError } from "zod";
import "@shared/utils/dotenv";
import { ApiError } from "@shared/utils/api-error";

export class BankApiConfig {
  private static schema = z.object({
    port: z
      .string({
        required_error: "process.env.BANK_API_PORT is required",
      })
      .min(1, "process.env.BANK_API_PORT must contain at least 1 character(s)")
      .transform((data) => parseInt(data, 10)),
    host: z
      .string({
        required_error: "process.env.BANK_API_HOST is required",
      })
      .min(1, "process.env.BANK_API_HOST must contain at least 1 character(s)"),
    env: z.enum(["development", "production", "staging", "testing"], {
      required_error: "process.env.NODE_ENV is required",
      invalid_type_error:
        "Invalid process.env.NODE_ENV value. Expected 'development' | 'production' | 'staging' | 'testing'",
    }),
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
