import "@shared/utils/dotenv";

import path from "path";

import { readFileSync } from "fs";

import z, { ZodError } from "zod";

import { ApiError, minimum, required } from "@shared/utils";

import { Algorithm } from "jsonwebtoken";

export class JWTConfig {
  private static schema = z.object({
    algorithm: z
      .string(required("process.env.JWT_ALGORITHM"))
      .min(1, minimum("process.env.JWT_ALGORITHM"))
      .transform((data) => data as Algorithm),
    privateKeyPath: z
      .string(required("process.env.PRIVATE_KEY_PATH"))
      .min(1, minimum("process.env.PRIVATE_KEY_PATH")),
    publicKeyPath: z
      .string(required("process.env.PRIVATE_KEY_PATH"))
      .min(1, minimum("process.env.PUBLIC_KEY_PATH")),
  });

  private static init() {
    try {
      return this.schema.parse({
        algorithm: process.env.JWT_ALGORITHM,
        privateKeyPath: process.env.PRIVATE_KEY_PATH,
        publicKeyPath: process.env.PUBLIC_KEY_PATH,
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
    return JWTConfig.init();
  }

  static getOne<T extends keyof ReturnType<typeof JWTConfig.get>>(key: T) {
    return JWTConfig.get()[key];
  }

  static read<T extends keyof ReturnType<typeof JWTConfig.get>>(key: T) {
    const keyPath = JWTConfig.getOne(key);
    return readFileSync(path.resolve(keyPath), "utf-8");
  }
}
