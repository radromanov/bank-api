import { RedisConfig } from "@config/redis.config";
import { CacheClient } from "../cache.client";

export class RedisClient implements CacheClient {
  private port: number;
  private dataPath: string;

  constructor(readonly redisConfig: typeof RedisConfig) {
    const { port, dataPath } = redisConfig.get();

    this.port = port;
    this.dataPath = dataPath;
  }
}
