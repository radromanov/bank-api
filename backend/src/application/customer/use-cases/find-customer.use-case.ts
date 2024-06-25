import { CustomerService } from "@domain/customer/customer.service";
import { ApiError } from "@shared/utils/api-error";

export class FindCustomerUseCase {
  constructor(private readonly customerService: CustomerService) {}

  async execute(payload: { email: string } | { id: string }) {
    try {
      if ("email" in payload) {
        await this.customerService.getCustomerByEmail(payload.email);
      } else if ("id" in payload) {
        await this.customerService.getCustomerByEmail(payload.id);
      }

      throw ApiError.BAD_REQUEST(
        "'email' or 'id' properties are required to find customer"
      );
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }

      throw ApiError.INTERNAL_SERVER_ERROR();
    }
  }
}
