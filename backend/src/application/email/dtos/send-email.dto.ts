import { ApiError } from "@shared/utils/api-error";
import { SendEmailSchema } from "@domain/email";

export class SendEmailDTO {
  private constructor(
    public sender: string,
    public recipient: string,
    public subject: string,
    public body: string
  ) {}

  static create(payload: unknown) {
    const parsed = SendEmailDTO.parse(payload);

    return new SendEmailDTO(
      parsed.sender,
      parsed.recipient,
      parsed.subject,
      parsed.body
    );
  }

  private static parse(payload: unknown) {
    const parsed = SendEmailSchema.safeParse(payload);

    if (!parsed.success) {
      throw ApiError.UNPROCESSABLE_ENTITY(
        parsed.error.errors[0].message || "Invalid send email payload in DTO"
      );
    }

    return parsed.data;
  }
}
