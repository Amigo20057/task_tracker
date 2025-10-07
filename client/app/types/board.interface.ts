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
  sections?: ISectionBoard[];
  userCreatorId: string;
}

export interface ISectionBoard extends IBase {
  name: string;
  color?: string;
  boardId: string;
  tasks?: ITask[];
}

export interface ITask extends IBase {
  name: string;
  description?: string;
  taskType: TaskType;
  deadline: Date;
  priority: Priority;
  creatorId: string;
  sectionId: string;
}
