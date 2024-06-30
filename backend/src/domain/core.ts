import z from "zod";
import { ApiError } from "@shared/utils";

export class Entity {
  id: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(makeId: () => string, makeDate: () => Date) {
    this.id = makeId();
    this.createdAt = makeDate();
    this.updatedAt = makeDate();
  }
}

export abstract class Dto {
  protected constructor() {}

  protected static parse<T>(payload: unknown, schema: z.Schema<T>) {
    const valid = schema.safeParse(payload);

    if (!valid.success) {
      throw ApiError.UNPROCESSABLE_ENTITY(valid.error.errors[0].message);
    }

    return valid.data;
  }

  static create(_payload: unknown) {
    throw ApiError.METHOD_NOT_ALLOWED(
      "Method not allowed. Use derived/child DTO class!"
    );
  }
}
