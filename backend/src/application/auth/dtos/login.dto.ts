import { LoginSchema } from "@domain/auth";
import { ApiError } from "@shared/utils/api-error";

export class LoginDTO {
  private constructor(public email: string) {}

  create = (payload: { [key: string]: unknown }) => {
    const { email } = this.parse(payload);

    return new LoginDTO(email);
  };

  private parse = (payload: unknown) => {
    const valid = LoginSchema.safeParse(payload);

    if (!valid.success) {
      throw ApiError.UNPROCESSABLE_ENTITY(
        valid.error.errors[0].message || "Invalid login payload"
      );
    }

    return valid.data;
  };
}
