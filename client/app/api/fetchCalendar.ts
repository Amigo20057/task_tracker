import axios from "axios";
import type { ITask } from "~/types/board.interface";

type ResponseCalendarServer = Promise<
  Record<
    string,
    Array<Pick<ITask, "id" | "name" | "deadline" | "taskType" | "priority">>
  >
>;

export const fetchCalendarByBoardId = async (boardId: string) => {
  const data = axios.get<ResponseCalendarServer>(
    `${import.meta.env.VITE_SERVER_URL}/boards/calendar/${boardId}`,
    {
      withCredentials: true,
    }
  );
  return data;
};
