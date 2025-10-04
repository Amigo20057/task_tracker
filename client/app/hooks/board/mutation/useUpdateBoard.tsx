import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import type { IBoard } from "~/types/task.interface";

export const useUpdateBoard = (boardId: string) => {
  const queryClient = useQueryClient();

  const updateBoardMutation = useMutation({
    mutationFn: async (updates: Partial<IBoard>) => {
      return await axios.patch(
        `${import.meta.env.VITE_SERVER_URL}/boards/update/`,
        {
          boardId,
        },
        {
          params: updates,
          withCredentials: true,
        }
      );
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["boards"] });
      queryClient.invalidateQueries({ queryKey: ["board", boardId] });
    },
    onError: async (error: any) => {
      console.log(error);
    },
  });

  return { updateBoardMutation };
};
