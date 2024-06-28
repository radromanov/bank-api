import { TransactionService } from "@domain/transaction";
import { TransactionInsertDTO } from "../dtos/new-transaction.dto";
import { TransactionRepository } from "@domain/transaction/transaction.repository";

export class TransactionServiceImpl implements TransactionService {
  constructor(private readonly transactionRepository: TransactionRepository) {}

  async createOne(dto: TransactionInsertDTO): Promise<void> {
    await this.transactionRepository.save(dto);
  }
}
