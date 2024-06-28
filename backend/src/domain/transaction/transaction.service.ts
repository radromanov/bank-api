import { TransactionInsertDTO } from "@application/transaction";
export interface TransactionService {
  createOne(dto: TransactionInsertDTO): Promise<void>;
  //   createMany(dtos: TransactionDTO[]): Promise<void>;
  //   updateOne(dto: TransactionDTO): Promise<void>;
  //   updateMany(dtos: TransactionDTO[]): Promise<void>;
  //   findMany(userId: string): Promise<TransactionSchema>;
  //   findOne(id: string): Promise<TransactionSchema>;
  //   deleteOne(id: string): Promise<void>;
  //   deleteMany(ids: string[]): Promise<void>;
}
