import { json } from "drizzle-orm/pg-core";
import { boolean } from "drizzle-orm/pg-core";
import { uniqueIndex } from "drizzle-orm/pg-core";
import { timestamp } from "drizzle-orm/pg-core";
import { varchar } from "drizzle-orm/pg-core";
import { pgTable } from "drizzle-orm/pg-core";

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
