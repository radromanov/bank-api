import { email } from "@shared/utils/zod";
import z from "zod";

export const LoginSchema = z.object({ email });
