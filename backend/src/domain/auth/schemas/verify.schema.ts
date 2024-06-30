import z from "zod";
import { errors, maximum, minimum } from "@shared/utils";

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
