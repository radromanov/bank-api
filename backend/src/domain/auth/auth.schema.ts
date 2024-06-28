import z from "zod";
import { email, enumeration, errors, maximum, minimum } from "@shared/utils";
import { createInsertSchema } from "drizzle-zod";
import { usersTable } from "@infrastructure/database";

export const LoginSchema = z.object({ email: email("Login email") });

export const VerifySchema = z.object({
  otp: z
    .string(errors("OTP"))
    .min(6, minimum("OTP", 6))
    .max(6, maximum("OTP", 6)),
  token: z
    .string(errors("Token"))
    .min(64, minimum("Token", 64))
    .max(64, maximum("TOKEN", 64)),
});

export const RegisterSchema = createInsertSchema(usersTable, {
  roles: enumeration<["ADMIN_ROLE", "BASIC_ROLE"]>("roles", [
    "ADMIN_ROLE",
    "BASIC_ROLE",
  ]).array(),
});
