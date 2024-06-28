import { v7 as uuidv7 } from "uuid";

import { ApiError } from "@shared/utils";

import { TransactionInsert } from "@domain/transaction";

export class TransactionInsertDTO {
  private constructor(
    public id: TransactionInsert["id"],
    public userId: TransactionInsert["userId"],
    public amount: TransactionInsert["amount"],
    public description: TransactionInsert["description"],
    public currency: TransactionInsert["currency"],
    public type: TransactionInsert["type"],
    public status: TransactionInsert["status"]
  ) {}

  static create(payload: { [key: string]: any }) {
    const id = uuidv7();
    const dto = this.parse({ ...payload, id });

    return new TransactionInsertDTO(
      dto.id,
      dto.userId,
      dto.amount,
      dto.description,
      dto.currency,
      dto.type,
      dto.status
    );
  }

  private static parse(payload: unknown) {
    console.log("incoming transaction payload", payload);

    const valid = TransactionInsert.safeParse(payload);

    if (!valid.success) {
      throw ApiError.UNPROCESSABLE_ENTITY(
        "Missing or invalid transaction payload"
      );
    }

    return valid.data;
  }
}
