import { Dto } from "@domain/core";
import { RegisterSchema } from "../schemas/register.schema";

export class RegisterDto extends Dto {
  private constructor(
    public id: string,
    public email: string,
    public firstName: string,
    public lastName: string,
    public image: string
  ) {
    super();
    Object.setPrototypeOf(this, RegisterDto.prototype);
  }

  static create(payload: unknown) {
    const dto = this.parse(payload, RegisterSchema);
    return new RegisterDto(
      dto.id,
      dto.email,
      dto.firstName,
      dto.lastName,
      dto.image
    );
  }
}
