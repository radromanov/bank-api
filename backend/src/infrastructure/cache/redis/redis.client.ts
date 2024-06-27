import { RedisConfig } from "@config/redis.config";
import { CacheClient } from "../cache.client";
import { Redis } from "ioredis";
import { createHash } from "crypto";
import { ApiError } from "@shared/utils/api-error";

export class RedisClient implements CacheClient {
  private _client: Redis | null;

  private host: string;
  private port: number;
  private pass: string;

  constructor(readonly redisConfig: typeof RedisConfig) {
    const { host, port, pass } = redisConfig.get();

    this.host = host;
    this.port = port;
    this.pass = pass;

    this._client = this.init();
  }

  private init() {
    if (!this._client) {
      this._client = new Redis({
        host: this.host,
        port: this.port,
        password: this.pass,
      });
    }

    return this._client;
  }

  private get client() {
    if (!this._client) {
      this.init();
    }

    return this._client!;
  }

  createKey(key: string) {
    return createHash("sha256").update(key).digest().toString("hex");
  }

  createOtp(length: number = 6) {
    let lengthLower = "1";
    let lengthUpper = "9";

    for (let i = 0; i < length - 1; i++) {
      lengthLower += "0";
      lengthUpper += "0";
    }

    return Math.floor(
      parseInt(lengthLower, 10) + Math.random() * parseInt(lengthUpper, 10)
    ).toString();
  }

  async get<T>(key: string) {
    const result = await this.client.get(key);
    try {
      if (!result) return null;

      return JSON.parse(result) as T;
    } catch (error) {
      return result;
    }
  }

  /**
   * @param key Key to the key-value pair in Redis.
   * @param data Data we're caching.
   * @param expire Expiration time in seconds. Defaults to 900 seconds (15 minutes).
   * @returns The key to the key-value pair.
   */
  async set(key: string, data: unknown, expire: number = 900) {
    const exists = await this.get(key);
    if (exists) {
      throw ApiError.CONFLICT(`Key ${key} is already cached`);
    }

    const value = typeof data === "string" ? data : JSON.stringify(data);

    await this.client.multi().set(key, value).expire(key, expire).exec();
  }

  async del(key: string) {
    await this.client.del(key);
  }
}
