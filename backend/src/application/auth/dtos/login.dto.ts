import { LoginSchema } from "@domain/auth";
import { ApiError } from "@shared/utils";

export class LoginDTO {
  private constructor(public email: string) {}

  static create(payload: unknown) {
    const { email } = LoginDTO.parse(payload);

    return new LoginDTO(email);
  }

  private static parse(payload: unknown) {
    const valid = LoginSchema.safeParse(payload);

    if (!valid.success) {
      throw ApiError.UNPROCESSABLE_ENTITY(
        valid.error.errors[0].message || "Invalid login payload"
      );
    }

    return valid.data;
  }
}
