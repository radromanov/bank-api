import { RedisConfig } from "@config/redis.config";
import { CacheClient } from "../cache.client";
import { Redis } from "ioredis";

export class RedisClient implements CacheClient {
  private _client: Redis | null;
  private url: string;

  constructor(readonly redisConfig: typeof RedisConfig) {
    this.url = redisConfig.getOne("url");

    this._client = this.init();
  }

  private init() {
    if (!this._client) {
      this._client = new Redis(this.url);
    }

    return this._client;
  }

  private get client() {
    if (!this._client) {
      this.init();
    }

    return this._client!;
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
  async set(key: string, data: unknown, expire = 900) {
    const value = typeof data === "string" ? data : JSON.stringify(data);

    await this.client.multi().set(key, value).expire(key, expire).exec();

    return key;
  }

  async del(key: string | string[]) {
    await this.client.del(...key);
  }
}
