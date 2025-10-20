import axios from "axios";
import type { ITask } from "~/types/board.interface";

export type ResponseCalendarData = Promise<
  Record<
    string,
    Array<Pick<ITask, "id" | "name" | "deadline" | "taskType" | "priority">>
  >
>;

export const fetchCalendarByBoardId = async (boardId: string) => {
  return await axios.get<ResponseCalendarData>(
    `${import.meta.env.VITE_SERVER_URL}/boards/calendar/${boardId}`,
    {
      withCredentials: true,
    }
  );
};
