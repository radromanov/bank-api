import { Entity } from "@domain/core";

export interface VerifyEntity extends Entity {
  otp: string;
  token: string;
}
