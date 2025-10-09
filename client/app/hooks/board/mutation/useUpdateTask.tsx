import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import type { ITask } from "~/types/board.interface";

export const useUpdateTask = (
  boardId: string,
  sectionId: string,
  taskId: string
) => {
  const queryClient = useQueryClient();

  const updateTaskMutation = useMutation({
    mutationFn: async (updates: Partial<ITask>) => {
      return await axios.patch(
        `${import.meta.env.VITE_SERVER_URL}/boards/section/task/update/`,
        {
          boardId,
          sectionId,
          taskId,
        },
        {
          params: updates,
          withCredentials: true,
        }
      );
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["board", boardId] });
    },
    onError: async (error: any) => {
      console.log(error);
    },
  });

  return { updateTaskMutation };
};
