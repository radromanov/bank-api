import { NewCustomerDTO } from "@application/customer/dtos/new-customer.dto";
import { Customer } from "./customer.entity";

export interface CustomerService {
  createCustomer(dto: NewCustomerDTO): Promise<void>;
  getCustomerByEmail(email: string): Promise<Customer | null>;
  getCustomerById(id: string): Promise<Customer | null>;
}
