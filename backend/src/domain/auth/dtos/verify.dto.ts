import { Dto } from "@domain/core";
import { VerifySchema } from "../schemas/verify.schema";

export class VerifyDto extends Dto {
  private constructor(public otp: string, public token: string) {
    super();
    Object.setPrototypeOf(this, VerifyDto.prototype);
  }

  static override create(payload: unknown) {
    const dto = this.parse(payload, VerifySchema);
    return new VerifyDto(dto.otp, dto.token);
  }
}
