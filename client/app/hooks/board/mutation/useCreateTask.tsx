import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import type { Priority, TaskType } from "~/types/board.interface";

export const useCreateTask = (boardId: string) => {
  const queryClient = useQueryClient();
  const createTaskMutation = useMutation({
    mutationFn: async (data: {
      sectionId: string;
      name: string;
      taskType: TaskType;
      deadline: Date;
      priority: Priority;
    }) => {
      return await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/boards/section/task/create`,
        data,
        { withCredentials: true }
      );
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["boards", boardId] });
      queryClient.invalidateQueries({ queryKey: ["boards"] });
    },
    onError: async (error: any) => {
      console.log(error);
    },
  });

  return { createTaskMutation };
};
