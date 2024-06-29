import { ApiError } from "@shared/utils";

import { RegisterSchema } from "./auth.schema";

export class RegisterDto {
  private constructor(
    public id: string,
    public email: string,
    public firstName: string,
    public lastName: string,
    public image: string
  ) {}

  private static parse(payload: unknown) {
    const valid = RegisterSchema.safeParse(payload);

    if (!valid.success) {
      throw ApiError.UNPROCESSABLE_ENTITY(valid.error.errors[0].message);
    }

    return valid.data;
  }

  static create(payload: unknown) {
    const dto = RegisterDto.parse(payload);
    return new RegisterDto(
      dto.id,
      dto.email,
      dto.firstName,
      dto.lastName,
      dto.image
    );
  }
}
