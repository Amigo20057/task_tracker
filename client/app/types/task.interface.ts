import type { IBase } from "./base.interface";
import type { IUser } from "./user.interface";

export type Accessability = "public" | "private";

//P1 - Hight Priority
//P2 - Medium Priority
//P3 - Low Priority
export type Priority = "P1" | "P2" | "P3";

export type TaskType = "Task" | "Bag";

export interface IBoard extends IBase {
  name: string;
  sections: ISectionBoard[] | null;
  userCreator: IUser;
  users: IUser[] | null;
  accessability: Accessability;
  userCreatorId: string;
}

export interface ISectionBoard extends IBase {
  boardId: string;
  name: string;
  tasksCount: number;
  color?: string;
  tasks: ITask[];
}

export interface ITask extends IBase {
  sectionId: string;
  name: string;
  description?: string;
  creator: IUser;
  taskType: TaskType;
  assigned: IUser[] | IUser | null;
  deadline: Date;
  priority: Priority;
}
