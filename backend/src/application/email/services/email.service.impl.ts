import { EmailService } from "@domain/email";
import { SendEmailDTO } from "../dtos/send-email.dto";

export class EmailServiceImpl implements EmailService {
  constructor() {}

  async send(dto: SendEmailDTO): Promise<void> {}
}
