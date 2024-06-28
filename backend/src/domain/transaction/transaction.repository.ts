import { TransactionInsertDTO } from "@application/transaction";

export interface TransactionRepository {
  save(dto: TransactionInsertDTO): Promise<void>;
}
