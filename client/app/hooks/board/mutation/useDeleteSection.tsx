import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useDeleteSection = (boardId: string) => {
  const queryClient = useQueryClient();
  const createSectionMutation = useMutation({
    mutationFn: async (data: Record<string, any>) => {
      await axios.delete(
        `${import.meta.env.VITE_SERVER_URL}/boards/section/delete/`,
        {
          data,
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

  return { createSectionMutation };
};
