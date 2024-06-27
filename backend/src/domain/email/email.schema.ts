import z from "zod";
import { email, notNullStr } from "@shared/utils";

export const SendEmailSchema = z.object({
  sender: email("Sender Email"),
  recipient: email("Recipient email"),
  subject: notNullStr("subject"),
  body: notNullStr("body"),
});

export type SendEmail = z.infer<typeof SendEmailSchema>;
