export type CalendarTask = {
  id: string;
  name: string;
  taskType: "Task" | "Bag";
  deadline: string;
};

export type CalendarEvent = {
  title: string;
  start: Date;
  end: Date;
  allDay?: boolean;
  resource: CalendarTask;
};
