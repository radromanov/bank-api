import { email } from "@shared/utils";
import z from "zod";

export const LoginSchema = z.object({ email: email("Login email") });
