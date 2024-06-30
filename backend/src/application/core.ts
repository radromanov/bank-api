import { Dto, Entity } from "@domain/core";

export abstract class Mapper {
  static fromEntity(_entity: Entity): Dto {
    throw new Error("Method not implemented! Use derived class");
  }
}
