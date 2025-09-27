import type { IBase } from "./base.interface";

export interface IUser extends IBase {
  name: string;
  email: string;
  password: string;
  color: string;
}
