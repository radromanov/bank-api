import { v7 as uuidv7 } from "uuid";
import { ApiError } from "@shared/utils/api-error";
import { createUserAvatar } from "@shared/utils/create-user-avatar";
import { NewUserSchema } from "@domain/user/user.schema";

export class NewUserDTO {
  private constructor(
    public id: string,
    public email: string,
    public firstName: string,
    public lastName: string,
    public image: string
  ) {}

  static create(payload: { [key: string]: unknown }) {
    const { email, firstName, lastName } = NewUserDTO.parse(payload);

    const id = uuidv7();
    const image = createUserAvatar(firstName, lastName);

    return new NewUserDTO(id, email, firstName, lastName, image);
  }

  private static parse(payload: unknown) {
    const parsed = NewUserSchema.safeParse(payload);

    if (!parsed.success) {
      throw ApiError.UNPROCESSABLE_ENTITY(
        parsed.error.errors[0].message || "Invalid new user payload in DTO"
      );
    }

    return parsed.data;
  }
}
