import { SendEmailDto } from "../dtos/send-email.dto";

export interface EmailService {
  send(dto: SendEmailDto): Promise<void>;
}
