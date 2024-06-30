import { Mapper } from "@application/core";
import { RegisterDto } from "@domain/auth";
import { UserEntity } from "@infrastructure/user";
import { PartialBy } from "@shared/types";

export class RegisterMapper extends Mapper {
  static override fromEntity(
    entity: PartialBy<UserEntity, "roles" | "isSuspended" | "isVerified">
  ): RegisterDto {
    return RegisterDto.create({
      id: entity.id,
      email: entity.email,
      firstName: entity.firstName,
      lastName: entity.lastName,
      image: entity.image,
    });
  }
}
