import { v7 as uuidv7 } from "uuid";
import { ApiError } from "@shared/utils/api-error";
import { NewCustomerSchema } from "@domain/customer/customer.schema";
import { createUserAvatar } from "@shared/utils/create-user-avatar";

export class NewCustomerDTO {
  private constructor(
    public id: string,
    public email: string,
    public firstName: string,
    public lastName: string,
    public image: string
  ) {}

  static create(payload: { [key: string]: unknown }) {
    const { email, firstName, lastName } = NewCustomerDTO.parse(payload);

    const id = uuidv7();
    const image = createUserAvatar(firstName, lastName);

    return new NewCustomerDTO(id, email, firstName, lastName, image);
  }

  private static parse(payload: unknown) {
    const parsed = NewCustomerSchema.safeParse(payload);

    if (!parsed.success) {
      throw ApiError.UNPROCESSABLE_ENTITY(
        parsed.error.errors[0].message || "Invalid new customer payload in DTO"
      );
    }

    return parsed.data;
  }
}
