import { EmailService, SendEmailDto } from "@domain/email";
import { EmailClient } from "@infrastructure/email";

export class EmailServiceImpl implements EmailService {
  constructor(private readonly emailClient: EmailClient) {}

  async send(dto: SendEmailDto): Promise<void> {
    return await this.emailClient.send(dto);
  }
}
