import { CustomerRepository } from "@domain/customer/customer.repository";
import { NewCustomerDTO } from "../dtos/new-customer.dto";
import { ApiError } from "@shared/utils/api-error";
import { Customer } from "@domain/customer/customer.entity";
import { CustomerService } from "@domain/customer/customer.service";

export class CustomerServiceImpl implements CustomerService {
  constructor(private readonly customerRepository: CustomerRepository) {}

  async createCustomer(dto: NewCustomerDTO): Promise<void> {
    const exists = await this.customerRepository.findByEmail(dto.email);

    if (exists) {
      throw ApiError.CONFLICT(`User already exists`);
    }

    const customer = new Customer(
      dto.id,
      dto.email,
      dto.firstName,
      dto.lastName,
      dto.image
    );

    await this.customerRepository.save(customer);
  }

  async getCustomerByEmail(email: string): Promise<Customer | null> {
    return this.customerRepository.findByEmail(email);
  }

  async getCustomerById(id: string): Promise<Customer | null> {
    return this.customerRepository.findById(id);
  }
}
