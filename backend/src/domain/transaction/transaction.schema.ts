import { transactionsTable } from "@infrastructure/database";
import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const TransactionSchema = createSelectSchema(transactionsTable);
export const NewTransactionSchema = createInsertSchema(transactionsTable);

export type TransactionSchema = InferSelectModel<typeof transactionsTable>;
export type NewTransactionSchema = InferInsertModel<typeof transactionsTable>;
