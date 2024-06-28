import {
  pgTable,
  varchar,
  timestamp,
  uniqueIndex,
  json,
  boolean,
  decimal,
} from "drizzle-orm/pg-core";

export const usersTable = pgTable(
  "users",
  {
    id: varchar("id", { length: 36 }).primaryKey().notNull(),
    email: varchar("email", { length: 255 }).notNull(),

    image: varchar("image").notNull(),
    firstName: varchar("first_name", { length: 255 }).notNull(),
    lastName: varchar("last_name", { length: 255 }).notNull(),
    roles: json("roles").default(["BASIC_ROLE"]).notNull(),

    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),

    isVerified: boolean("is_verified").default(false).notNull(),
    isSuspended: boolean("is_suspended").default(false).notNull(),
  },
  (t) => ({
    idIdx: uniqueIndex("unique_user_id").on(t.id),
    emailIdx: uniqueIndex("unique_user_email").on(t.email),
  })
);

export const transactionsTable = pgTable(
  "transactions",
  {
    id: varchar("id", { length: 36 }).primaryKey().notNull(),

    userId: varchar("user_id", { length: 36 })
      .notNull()
      .references(() => usersTable.id),

    amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),

    currency: varchar("currency", {
      length: 4,
      enum: ["EUR", "BGN", "USD"],
    })
      .default("BGN")
      .notNull(),
    type: varchar("type", {
      length: 8,
      enum: ["Purchase", "Refund", "Transfer"],
    })
      .default("Purchase")
      .notNull(),
    status: varchar("status", {
      length: 12,
      enum: ["Pending", "Completed", "Failed"],
    })
      .default("Pending")
      .notNull(),

    description: varchar("description", { length: 255 }).notNull(),

    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (t) => ({
    idIdx: uniqueIndex("unique_user_id").on(t.id),
  })
);
