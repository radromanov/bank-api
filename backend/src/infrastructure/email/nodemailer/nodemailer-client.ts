import { createTransport, getTestMessageUrl } from "nodemailer";
import { EmailClient } from "../email-client";
import { SendEmailDTO } from "@application/email";
import { NodemailerConfig } from "@config/nodemailer.config";

export class NodemailerClient implements EmailClient {
  private host: string;
  private port: number;
  private user: string;
  private pass: string;

  constructor(options: typeof NodemailerConfig) {
    const { host, port, user, pass } = options.get();

    this.host = host;
    this.port = port;
    this.user = user;
    this.pass = pass;
  }

  private init() {
    return createTransport({
      host: this.host,
      port: this.port,
      auth: {
        user: this.user,
        pass: this.pass,
      },
    });
  }

  async send(dto: SendEmailDTO): Promise<void> {
    const { sender, recipient, subject, body } = dto;
    const transport = this.init();

    const info = await transport.sendMail({
      sender,
      to: recipient,
      subject,
      text: body,
    });

    console.log("Email preview URL:", getTestMessageUrl(info));
  }
}
