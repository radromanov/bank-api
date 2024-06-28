import { CacheClient } from "@infrastructure/cache";
import { ApiError } from "@shared/utils";
import { Request, Response, NextFunction } from "express";

/**
 * @field `allowed` Allowed number of requests.
 * @field `expire` Expiration time in seconds.
 */
interface Options {
  /**
   * Allowed number of requests.
   */
  allowed: number;
  /**
   * Expiration time in seconds.
   */
  expire: number;
}

export class RateLimiter {
  private allowed: number;
  private expire: number;

  constructor(private readonly cache: CacheClient, options: Options) {
    this.allowed = options.allowed;
    this.expire = options.expire;
  }

  run = async (req: Request, _res: Response, next: NextFunction) => {
    const ip = this.extractIp(req);

    const key = this.cache.createKey(ip);
    const requests = await this.cache.incr(key);

    if (requests === 1) {
      await this.cache.expire(key, this.expire);
    }

    if (this.isLimited(requests)) {
      next(ApiError.TOO_MANY_REQUESTS());
    } else {
      next();
    }
  };

  private extractIp(req: Request): string {
    // x-forwarded-for -- if client is sitting in front of a remote proxy (e.g. nginx)
    const forwarded = req.headers["x-forwarded-for"] as string | undefined;
    if (forwarded) {
      return forwarded.split(",")[0].trim();
    }
    return req.socket.remoteAddress || "unknown";
  }

  private isLimited(requests: number): boolean {
    if (requests > this.allowed) {
      console.warn(`Rate limit exceeded`);
      return true;
    }
    return false;
  }
}
