import {
  boolean,
  date,
  email,
  enumeration,
  id,
  notNullStr,
  url,
} from "@shared/utils/zod";
import z from "zod";

export const CustomerSchema = z.object({
  id: id(),
  email,
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

export const NewCustomerSchema = z.object({
  email,
  firstName: notNullStr("First name", 1, 255),
  lastName: notNullStr("Last name", 1, 255),
});
