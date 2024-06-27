import { EmailService } from "@domain/email";
import { SendEmailDTO } from "../dtos/send-email.dto";

export class SendEmailUseCase {
  constructor(private readonly emailService: EmailService) {}

  async execute(dto: SendEmailDTO) {
    console.log(dto);

    return await this.emailService.send(dto);
  }
}
