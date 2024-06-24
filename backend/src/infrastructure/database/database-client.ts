export abstract class DatabaseClient {
  abstract findById<R>(id: string, table: unknown): Promise<R>;
  abstract findByEmail<R>(email: string, table: unknown): Promise<R>;
  abstract createOne<P>(payload: P, table: unknown): Promise<void>;
}
