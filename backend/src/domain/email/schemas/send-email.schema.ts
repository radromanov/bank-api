import { email, notNullStr } from "@shared/utils";
import z from "zod";

export const SendEmailSchema = z.object({
  sender: email("Sender Email"),
  recipient: email("Recipient email"),
  subject: notNullStr("subject"),
  body: notNullStr("body"),
});
