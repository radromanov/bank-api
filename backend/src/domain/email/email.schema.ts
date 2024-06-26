import { email, notNullStr } from "@shared/utils/zod";
import z from "zod";

export const SendEmailSchema = z.object({
  sender: email,
  recipient: email,
  subject: notNullStr("subject"),
  body: notNullStr("body"),
});

export type SendEmail = z.infer<typeof SendEmailSchema>;
