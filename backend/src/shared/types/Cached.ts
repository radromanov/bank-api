import { NewUserDTO } from "@application/user";

export interface Cached {
  otp: string;
  user: NewUserDTO;
  type: "register" | "login";
}
