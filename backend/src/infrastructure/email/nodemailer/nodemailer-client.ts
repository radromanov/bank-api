import { createTransport } from "nodemailer";
import { EmailClient } from "../email-client";

interface NodemailerClientOptions {
  user: string;
  pass: string;
  host: string;
  port: number;
}

export class NodemailerClient implements EmailClient {
  private host: string;
  private port: number;
  private user: string;
  private pass: string;

  constructor(options: NodemailerClientOptions) {
    const { host, port, user, pass } = options;

    this.host = host;
    this.port = port;
    this.user = user;
    this.pass = pass;
  }

  init() {
    return createTransport({
      host: this.host,
      port: this.port,
      auth: {
        user: this.user,
        pass: this.pass,
      },
    });
  }
}
