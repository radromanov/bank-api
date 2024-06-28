import { TransactionService } from "@domain/transaction";
import { TransactionInsertDTO } from "../dtos/new-transaction.dto";

export class CreateTransactionUseCase {
  constructor(private readonly transactionService: TransactionService) {}

  async execute(dto: TransactionInsertDTO) {
    console.log("in transaction use case", dto);
    await this.transactionService.createOne(dto);
  }
}
