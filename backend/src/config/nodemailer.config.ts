import z, { ZodError } from "zod";
import { ApiError, errors, minimum } from "@shared/utils";

export class NodemailerConfig {
  private static schema = z.object({
    user: z
      .string(errors("process.env.SMTP_USER"))
      .min(1, minimum("process.env.SMTP_USER")),
    pass: z
      .string(errors("process.env.SMTP_PASS"))
      .min(1, minimum("process.env.SMTP_PASS")),
    host: z
      .string(errors("process.env.SMTP_HOST"))
      .min(1, minimum("process.env.SMTP_HOST")),
    port: z
      .string(errors("process.env.SMTP_PORT"))
      .min(1, minimum("process.env.SMTP_PORT"))
      .transform((data) => parseInt(data, 10)),
  });

  private static init() {
    try {
      return this.schema.parse({
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
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
    return this.init();
  }

  static getOne<T extends keyof ReturnType<typeof this.get>>(key: T) {
    return this.get()[key];
  }
}
