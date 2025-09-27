import type { IBase } from "./base.interface";
import type { IUser } from "./user.interface";

type Accessability = "public" | "private";

//P1 - Hight Priority
//P2 - Medium Priority
//P3 - Low Priority
type Priority = "P1" | "P2" | "P3";

type TaskType = "Task" | "Bag";

export interface IBoard extends IBase {
  name: string;
  sections: ISectionBoard[] | null;
  userCreator: IUser;
  users: IUser[] | null;
  accessability: Accessability;
}

export interface ISectionBoard extends IBase {
  name: string;
  tasksCount: number;
  color?: string;
  tasks: ITask[];
}

export interface ITask extends IBase {
  name: string;
  description?: string;
  creator: IUser;
  taskType: TaskType;
  assigned: IUser[] | IUser | null;
  deadline: Date;
  priority: Priority;
}
