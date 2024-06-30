import { Mapper } from "@application/core";
import { SendEmailEntity } from "../entities/send-email.entity";
import { SendEmailDto } from "@domain/email";

export class SendEmailMapper extends Mapper {
  static override fromEntity(entity: SendEmailEntity): SendEmailDto {
    return SendEmailDto.create({
      sender: entity.sender,
      recipient: entity.recipient,
      subject: entity.subject,
      body: entity.body,
    });
  }
}
