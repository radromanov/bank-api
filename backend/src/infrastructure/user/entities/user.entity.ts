import { Entity } from "@domain/core";
import { makeId, makeDate } from "@shared/utils";

export class UserEntity extends Entity {
  constructor(
    public email: string,
    public firstName: string,
    public lastName: string,
    public image: string,
    public roles: ("BASIC_ROLE" | "ADMIN_ROLE")[],
    public isVerified: boolean,
    public isSuspended: boolean
  ) {
    super(makeId, makeDate);
  }
}
