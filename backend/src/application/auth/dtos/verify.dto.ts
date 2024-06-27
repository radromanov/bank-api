import { VerifySchema } from "@domain/auth";
import { ApiError } from "@shared/utils";

export class VerifyDTO {
  private constructor(public otp: string, public token: string) {}

  static create(payload: unknown) {
    const { otp, token } = VerifyDTO.parse(payload);

    return new VerifyDTO(otp, token);
  }

  private static parse(payload: unknown) {
    const valid = VerifySchema.safeParse(payload);

    if (!valid.success) {
      throw ApiError.UNPROCESSABLE_ENTITY(
        valid.error.errors[0].message ||
          "Missing or invalid verification payload"
      );
    }

    return valid.data;
  }
}
