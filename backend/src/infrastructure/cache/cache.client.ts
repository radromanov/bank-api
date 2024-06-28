export interface CacheClient {
  createKey(key: string): string;
  createOtp(length?: number): string;
  get<T>(key: string): Promise<T | null>;
  set(key: string, data: unknown, expire?: number): Promise<void>;
  del(key: string | string[]): Promise<void>;
  incr(key: string): Promise<number>;
}
