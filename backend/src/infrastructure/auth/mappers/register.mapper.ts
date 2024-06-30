import { Mapper } from "@application/core";
import { RegisterDto } from "@domain/auth";
import { UserEntity } from "@infrastructure/user";

export class RegisterMapper extends Mapper {
  static override fromEntity(entity: UserEntity): RegisterDto {
    return RegisterDto.create({
      id: entity.id,
      email: entity.email,
      firstName: entity.firstName,
      lastName: entity.lastName,
      image: entity.image,
    });
  }
}
