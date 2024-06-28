import { RegisterDTO } from "@application/auth";

export interface Cached {
  otp: string;
  user: RegisterDTO;
  type: "register" | "login";
}
