import { ApiError } from "@shared/utils/api-error";
import { errors, minimum } from "@shared/utils/zod";
import z, { ZodError } from "zod";

export class RedisConfig {
  private static schema = z.object({
    port: z
      .string(errors("process.env.REDIS_PORT"))
      .min(1, minimum("process.env.REDIS_PORT"))
      .transform((data) => parseInt(data, 10)),
    dataPath: z
      .string(errors("process.env.REDIS_DOCKER_VOLUME_PATH"))
      .min(1, minimum("process.env.REDIS_DOCKER_VOLUME_PATH")),
  });

  private static init() {
    try {
      return this.schema.parse({
        port: process.env.REDIS_PORT,
        dataPath: process.env.REDIS_DOCKER_VOLUME_PATH,
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
