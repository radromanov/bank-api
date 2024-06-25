export abstract class DatabaseClient {
  abstract findById<R>(id: string, table: unknown): Promise<R>;
  abstract findByEmail<R>(email: string, table: unknown): Promise<R>;
  abstract create(payload: unknown, table: unknown): Promise<void>;
  abstract dropTable(table: unknown): Promise<void>;
}
