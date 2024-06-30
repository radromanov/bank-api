import { EmailService, SendEmailDto } from "@domain/email";

export class SendEmailUseCase {
  constructor(private readonly emailService: EmailService) {}

  async execute(dto: SendEmailDto) {
    return await this.emailService.send(dto);
  }
}
