import { Customer } from "@domain/customer/customer.entity";
import { CustomerService } from "@domain/customer/customer.service";
import { ApiError } from "@shared/utils/api-error";

export class FindCustomerUseCase {
  constructor(private readonly customerService: CustomerService) {}

  async findById(id: string): Promise<Customer> {
    try {
      const customer = await this.customerService.getCustomerById(id);

      if (!customer) {
        throw ApiError.NOT_FOUND(`Customer with ID ${id} not found`);
      }

      return customer;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }

      throw ApiError.INTERNAL_SERVER_ERROR();
    }
  }

  async findByEmail(email: string): Promise<Customer> {
    try {
      const customer = await this.customerService.getCustomerByEmail(email);

      if (!customer) {
        throw ApiError.NOT_FOUND(`Customer with email ${email} not found`);
      }

      return customer;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }

      throw ApiError.INTERNAL_SERVER_ERROR();
    }
  }
}
