import { Mapper } from "@application/core";
import { LoginDto } from "@domain/auth";
import { UserEntity } from "@infrastructure/user";

export class LoginMapper extends Mapper {
  static override fromEntity(entity: UserEntity): LoginDto {
    return LoginDto.create({ email: entity.email });
  }
}
