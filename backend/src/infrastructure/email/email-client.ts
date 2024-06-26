interface EmailClientOptions {
  smtp: string;
  user: string;
  pass: string;
  host: string;
  port: number;
}

export class EmailClient {
  private smtp: string;
  private user: string;
  private pass: string;
  private host: string;
  private port: number;

  constructor(options: EmailClientOptions) {
    const { smtp, user, pass, host, port } = options;

    this.smtp = smtp;
    this.user = user;
    this.pass = pass;
    this.host = host;
    this.port = port;
  }

  init() {
    return {
      smtp: this.smtp,
      user: this.user,
      pass: this.pass,
      host: this.host,
      port: this.port,
    };
  }
}
