import { PgColumn } from "drizzle-orm/pg-core";
import { PgTableWithColumns } from "drizzle-orm/pg-core";

export interface PgTableWithIdColumn
  extends PgTableWithColumns<{
    name: string;
    schema: undefined;
    dialect: "pg";
    columns: { id: PgColumn };
  }> {}

export interface PgTableWithEmailColumn
  extends PgTableWithColumns<{
    name: string;
    schema: undefined;
    dialect: "pg";
    columns: { email: PgColumn };
  }> {}
