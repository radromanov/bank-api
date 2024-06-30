import { Entity } from "@domain/core";
import { makeId, makeDate } from "@shared/utils";

export class SendEmailEntity extends Entity {
  constructor(
    public sender: string,
    public recipient: string,
    public subject: string,
    public body: string
  ) {
    super(makeId, makeDate);
  }
}
