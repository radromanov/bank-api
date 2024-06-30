import { usersTable } from "@infrastructure/database";
import { enumeration } from "@shared/utils";
import { createInsertSchema } from "drizzle-zod";

export const RegisterSchema = createInsertSchema(usersTable, {
  roles: enumeration<["ADMIN_ROLE", "BASIC_ROLE"]>("roles", [
    "ADMIN_ROLE",
    "BASIC_ROLE",
  ]).array(),
});
