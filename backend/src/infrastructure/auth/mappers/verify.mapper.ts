import { Mapper } from "@application/core";
import { VerifyEntity } from "../entities/verify.entity";
import { VerifyDto } from "@domain/auth";

export class VerifyMapper extends Mapper {
  static override fromEntity(entity: VerifyEntity) {
    return VerifyDto.create({ otp: entity.otp, token: entity.token });
  }
}
