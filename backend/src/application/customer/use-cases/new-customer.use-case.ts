import { CustomerService } from "@domain/customer/customer.service";
import { NewCustomerDTO } from "../dtos/new-customer.dto";
import { ApiError } from "@shared/utils/api-error";

export class NewCustomerUseCase {
  constructor(private readonly customerService: CustomerService) {}

  async createOne(dto: NewCustomerDTO): Promise<void> {
    try {
      await this.customerService.createCustomer(dto);
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw ApiError.INTERNAL_SERVER_ERROR();
    }
  }
}
