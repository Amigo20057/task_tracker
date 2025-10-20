import type { IBoard } from "./board.interface";
import type { IUser } from "./user.interface";

export interface IBase {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IContext {
  user?: IUser;
  isAuth: boolean;
  boards?: IBoard[];
}
