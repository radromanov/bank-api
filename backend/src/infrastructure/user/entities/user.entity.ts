import { Entity } from "@domain/core";

export class UserEntity implements Entity {
  constructor(
    public id: string,
    public email: string,
    public firstName: string,
    public lastName: string,
    public image: string,
    public roles: ("BASIC_ROLE" | "ADMIN_ROLE")[],
    public isVerified: boolean,
    public isSuspended: boolean,
    public createdAt: Date,
    public updatedAt: Date
  ) {}
}
