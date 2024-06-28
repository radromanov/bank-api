import { usersTable } from "@infrastructure/database";
import {
  boolean,
  date,
  email,
  enumeration,
  id,
  notNullStr,
  url,
} from "@shared/utils";
import { InferSelectModel } from "drizzle-orm";
import { createSelectSchema } from "drizzle-zod";

export const User = createSelectSchema(usersTable, {
  id: id(),
  email: email("User email"),
  firstName: notNullStr("firstName", 1, 255),
  lastName: notNullStr("lastName", 1, 255),
  image: url("image"),
  roles: enumeration<["ADMIN_ROLE", "BASIC_ROLE"]>("roles", [
    "ADMIN_ROLE",
    "BASIC_ROLE",
  ]).array(),
  isVerified: boolean("isVerified"),
  isSuspended: boolean("isSuspended"),
  createdAt: date("createdAt"),
  updatedAt: date("updatedAt"),
});

export interface User extends InferSelectModel<typeof usersTable> {
  roles: ("ADMIN_ROLE" | "BASIC_ROLE")[];
}
