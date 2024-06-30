import { Entity } from "@domain/core";
import { makeDate, makeId } from "@shared/utils";

export class VerifyEntity extends Entity {
  constructor(public otp: string, public token: string) {
    super(makeId, makeDate);
  }
}
