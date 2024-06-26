import { SendEmailDTO } from "@application/email";

export interface EmailService {
  send(options: SendEmailDTO): Promise<void>;
}
