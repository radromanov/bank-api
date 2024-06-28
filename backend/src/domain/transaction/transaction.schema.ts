import { transactionsTable } from "@infrastructure/database";
import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const Transaction = createSelectSchema(transactionsTable);
export const TransactionInsert = createInsertSchema(transactionsTable);

export type Transaction = InferSelectModel<typeof transactionsTable>;
export type TransactionInsert = InferInsertModel<typeof transactionsTable>;
