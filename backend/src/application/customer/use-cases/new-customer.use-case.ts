import { CustomerRepository } from "@domain/customer/customer.repository";
import { NewCustomerDTO } from "../dtos/new-customer.dto";
import { Customer } from "@domain/customer/customer.entity";
import { ApiError } from "@shared/utils/api-error";

export class NewCustomerUseCase {
  constructor(private readonly customerRepository: CustomerRepository) {}

  async execute(dto: NewCustomerDTO) {
    const exists = await this.customerRepository.findByEmail(dto.email);

    if (exists) {
      throw ApiError.CONFLICT(`User already exists`);
    }

    const customer = new Customer(
      dto.id,
      dto.email,
      dto.firstName,
      dto.lastName,
      dto.image,
      dto.roles,
      dto.isVerified,
      dto.isSuspended,
      dto.createdAt,
      dto.updatedAt
    );

    await this.customerRepository.save(customer);
  }
}
