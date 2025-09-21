import type { IBase } from "./base.interface";
import type { IUser } from "./user.interface";

type Accessability = "public" | "private";

//P1 - Hight Priority
//P2 - Medium Priority
//P3 - Low Priority
type Priority = "P1" | "P2" | "P3";

export interface IBoard extends IBase {
  name: string;
  tasks: ITask[] | null;
  userCreator: IUser;
  users: IUser[] | null;
  accessability: Accessability;
}

export interface ITask extends IBase {
  name: string;
  description?: string;
  assigned: IUser | IUser[];
  deadline: string;
  priority: Priority;
}
