// import { CacheClient } from "@infrastructure/cache";
import { CacheClient } from "@infrastructure/cache";
import { ApiError } from "@shared/utils";
import { Request, Response, NextFunction } from "express";

export class RateLimiter {
  constructor(private readonly cache: CacheClient) {}

  run = async (req: Request, _res: Response, next: NextFunction) => {
    // x-forwarded-for -- if client is sitting in front of a remote proxy (e.g. nginx)
    const ip = (req.headers["x-forwarded-for"] ||
      req.socket.remoteAddress) as string;

    const key = this.cache.createKey(ip);
    const requests = await this.cache.incr(key);

    try {
      await this.limit(requests);
      next();
    } catch (error) {
      if (error instanceof ApiError) {
        next(error);
      } else {
        next(ApiError.INTERNAL_SERVER_ERROR());
      }
    }
  };

  private limit = async (requests: number) => {
    if (requests > 20) {
      throw ApiError.TOO_MANY_REQUESTS();
    }
  };
}
