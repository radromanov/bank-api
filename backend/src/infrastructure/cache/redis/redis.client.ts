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

  private createKey(key: string) {
    return createHash("sha256").update(key).digest().toString("base64");
  }

  async get<T>(key: string) {
    const hash = this.createKey(key);
    const result = await this.client.get(hash);
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
  async set(key: string, data: unknown, expire = 900) {
    const exists = await this.get(key);
    if (exists) {
      throw ApiError.CONFLICT(`Key ${key} is already cached`);
    }

    const hash = this.createKey(key);
    const value = typeof data === "string" ? data : JSON.stringify(data);

    await this.client.multi().set(hash, value).expire(hash, expire).exec();

    return key;
  }

  async del(key: string | string[]) {
    let hash: string;

    if (typeof key === "string") {
      hash = this.createKey(key);
      await this.client.del(hash);
    } else {
      for (const k in key) {
        hash = this.createKey(k);
        await this.client.del(hash);
      }
    }
  }
}
