import { Dto } from "@domain/core";
import { SendEmailSchema } from "../schemas/send-email.schema";

export class SendEmailDto extends Dto {
  private constructor(
    public sender: string,
    public recipient: string,
    public subject: string,
    public body: string
  ) {
    super();
  }

  static override create(payload: unknown): SendEmailDto {
    const dto = SendEmailSchema.parse(payload);

    return new SendEmailDto(dto.sender, dto.recipient, dto.subject, dto.body);
  }
}
