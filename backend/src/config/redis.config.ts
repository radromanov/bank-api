import { ApiError } from "@shared/utils/api-error";
import { errors, minimum } from "@shared/utils/zod";
import z, { ZodError } from "zod";

export class RedisConfig {
  private static schema = z.object({
    host: z
      .string(errors("process.env.REDIS_HOST"))
      .min(1, minimum("process.env.REDIS_HOST")),
    port: z
      .string(errors("process.env.REDIS_PORT"))
      .min(1, minimum("process.env.REDIS_PORT"))
      .transform((data) => parseInt(data, 10)),
    user: z
      .string(errors("process.env.REDIS_USER"))
      .min(1, minimum("process.env.REDIS_USER")),
    pass: z
      .string(errors("process.env.REDIS_PASS"))
      .min(1, minimum("process.env.REDIS_PASS")),
    name: z
      .string(errors("process.env.REDIS_NAME"))
      .min(1, minimum("process.env.REDIS_NAME")),
    url: z
      .string(errors("process.env.REDIS_URL"))
      .min(1, minimum("process.env.REDIS_URL")),
  });

  private static init() {
    try {
      return this.schema.parse({
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
        user: process.env.REDIS_USER,
        pass: process.env.REDIS_PASS,
        name: process.env.REDIS_NAME,
        url: process.env.REDIS_URL,
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
