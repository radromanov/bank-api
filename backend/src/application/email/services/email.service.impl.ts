import { EmailService } from "@domain/email";
import { SendEmailDTO } from "../dtos/send-email.dto";
import { EmailClient } from "@infrastructure/email/email-client";

export class EmailServiceImpl implements EmailService {
  constructor(private readonly emailClient: EmailClient) {}

  async send(dto: SendEmailDTO): Promise<void> {
    return await this.emailClient.send(dto);
  }
}
