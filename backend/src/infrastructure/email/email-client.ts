import { SendEmailDTO } from "@application/email";

export interface EmailClient {
  send(dto: SendEmailDTO): Promise<void>;
}
