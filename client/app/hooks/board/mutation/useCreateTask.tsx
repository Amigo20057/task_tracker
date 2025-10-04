import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useCreateTask = () => {
  const queryClient = useQueryClient();
  const createTaskMutation = useMutation({
    mutationFn: async (data: { name: string; boardId: string }) => {
      return await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/boards/section/task/create`,
        data,
        { withCredentials: true }
      );
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["boards"] });
    },
    onError: async (error: any) => {
      console.log(error);
    },
  });

  return { createTaskMutation };
};
