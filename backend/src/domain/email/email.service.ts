import { SendEmailDTO } from "@application/email";

export interface EmailService {
  send(dto: SendEmailDTO): Promise<void>;
}
