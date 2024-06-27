export interface CacheClient {
  get<T>(key: string): Promise<string | T | null>;
  set(key: string, data: unknown, expire?: number): Promise<string>;
  del(key: string | string[]): Promise<void>;
}
