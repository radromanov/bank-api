import {
  CreateTransactionUseCase,
  TransactionInsertDTO,
} from "@application/transaction";
import { Request, Response } from "express";

export class TransactionController {
  constructor(private readonly createTransaction: CreateTransactionUseCase) {}

  handleCreateOne = async (req: Request, res: Response) => {
    // Attached by the auth middleware if the user is logged in
    const userId = res.locals.user.id;

    const transaction = TransactionInsertDTO.create({
      ...req.body,
      userId,
    });

    await this.createTransaction.execute(transaction);

    res.status(201).json(transaction);
  };
}
