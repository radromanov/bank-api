import { Dto } from "@domain/core";
import { LoginSchema } from "../schemas/login.schema";

export class LoginDto extends Dto {
  private constructor(public email: string) {
    super();
    Object.setPrototypeOf(this, LoginDto.prototype);
  }

  static override create(payload: unknown) {
    const dto = this.parse(payload, LoginSchema);

    return new LoginDto(dto.email);
  }
}
