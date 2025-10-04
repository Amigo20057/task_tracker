import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { IBoard } from "~/types/task.interface";

export const useBoard = (boardId: string) => {
  return useQuery({
    queryKey: ["board", boardId],
    queryFn: async () => {
      return await axios.get<IBoard>(
        `${import.meta.env.VITE_SERVER_URL}/boards/by-id/${boardId}`,
        {
          withCredentials: true,
        }
      );
    },
    select: (data) => data.data,
    retry: false,
  });
};
