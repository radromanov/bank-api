import { RegisterDto } from "@domain/auth";
import { UserEntity } from "@infrastructure/user";
import { PartialBy } from "@shared/types";

export class RegisterMapper {
  static fromEntity(
    userEntity: PartialBy<
      UserEntity,
      "roles" | "createdAt" | "isSuspended" | "updatedAt" | "isVerified"
    >
  ): RegisterDto {
    return RegisterDto.create({
      id: userEntity.id,
      email: userEntity.email,
      firstName: userEntity.firstName,
      lastName: userEntity.lastName,
      image: userEntity.image,
    });
  }
}
