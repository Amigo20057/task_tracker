import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useDeleteTask = (taskId: string) => {
  const queryClient = useQueryClient();
  const deleteTaskMutation = useMutation({
    mutationFn: async () => {
      await axios.delete(
        `${import.meta.env.VITE_SERVER_URL}/boards/section/task/${taskId}`,
        {
          withCredentials: true,
        }
      );
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["board"] });
    },
    onError: async (error: any) => {
      console.log(error);
    },
  });

  return { deleteTaskMutation };
};
