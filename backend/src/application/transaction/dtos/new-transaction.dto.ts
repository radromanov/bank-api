import { ApiError } from "@shared/utils";
import { NewTransactionSchema } from "@domain/transaction";

export class NewTransactionDTO {
  private constructor(
    public id: NewTransactionSchema["id"],
    public userId: NewTransactionSchema["userId"],
    public amount: NewTransactionSchema["amount"],
    public description: NewTransactionSchema["description"],
    public currency: NewTransactionSchema["currency"],
    public type: NewTransactionSchema["type"],
    public status: NewTransactionSchema["status"]
  ) {}

  static create(payload: unknown) {
    const dto = this.parse(payload);

    return new NewTransactionDTO(
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
    const valid = NewTransactionSchema.safeParse(payload);

    if (!valid.success) {
      throw ApiError.UNPROCESSABLE_ENTITY(
        "Missing or invalid transaction payload"
      );
    }

    return valid.data;
  }
}
