import "@shared/utils/dotenv";
import path from "path";
import { get } from "env-var";
import { readFileSync } from "fs";
import { Algorithm } from "jsonwebtoken";

export class JWTConfig {
  private static init() {
    return {
      algorithm: get("JWT_ALGORITHM").required().asString() as Algorithm,
      privateKeyPath: get("PRIVATE_KEY_PATH").required().asString(),
      publicKeyPath: get("PUBLIC_KEY_PATH").required().asString(),
    };
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
