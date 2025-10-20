import type { ITask } from "./board.interface";

export type CalendarTask =
  | {
      id: string;
      name: string;
      taskType: "Task" | "Bag";
      deadline: string;
    }
  | ITask;

export type CalendarEvent = {
  title: string;
  start: Date;
  end: Date;
  allDay?: boolean;
  resource: CalendarTask;
};
