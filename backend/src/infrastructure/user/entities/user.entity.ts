import { Entity } from "@domain/core";
import { makeId, makeDate, createUserAvatar } from "@shared/utils";

export class UserEntity extends Entity {
  constructor(
    public email: string,
    public firstName: string,
    public lastName: string,
    public image: string = createUserAvatar(firstName, lastName),
    public roles: ("BASIC_ROLE" | "ADMIN_ROLE")[] = ["BASIC_ROLE"],
    public isVerified: boolean = false,
    public isSuspended: boolean = false
  ) {
    super(makeId, makeDate);
  }
}
