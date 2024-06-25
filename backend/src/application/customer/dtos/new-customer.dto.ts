import { v7 as uuidv7 } from "uuid";
import { ApiError } from "@shared/utils/api-error";
import { NewCustomerSchema } from "@domain/customer/customer.schema";

export class NewCustomerDTO {
  private constructor(
    public id: string,
    public email: string,
    public firstName: string,
    public lastName: string,
    public image: string,
    public roles: ("ADMIN_ROLE" | "BASIC_ROLE")[],
    public isVerified: boolean,
    public isSuspended: boolean,
    public createdAt: Date,
    public updatedAt: Date
  ) {}

  static create(payload: { [key: string]: unknown }) {
    const {
      email,
      firstName,
      lastName,
      image,
      roles,
      isVerified,
      isSuspended,
    } = NewCustomerDTO.parse(payload);
    const id = uuidv7();
    const date = new Date();

    return new NewCustomerDTO(
      id,
      email,
      firstName,
      lastName,
      image,
      roles,
      isVerified,
      isSuspended,
      date,
      date
    );
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
