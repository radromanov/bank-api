import { SendEmailDto } from "@domain/email";

export interface EmailClient {
  send(dto: SendEmailDto): Promise<void>;
}
