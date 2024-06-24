import { Customer } from "@domain/customer/customer.entity";
import { CustomerRepository } from "@domain/customer/customer.repository";

export class CustomerRepositoryImpl implements CustomerRepository {
  async save(customer: Customer): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async findById(id: string): Promise<Customer | null> {
    throw new Error("Method not implemented.");
  }

  async findByEmail(email: string): Promise<Customer | null> {
    throw new Error("Method not implemented.");
  }
}
