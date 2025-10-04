import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useCreateSection = () => {
  const queryClient = useQueryClient();
  const createSectionMutation = useMutation({
    mutationFn: async (data: { name: string; boardId: string }) => {
      return await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/boards/section/create`,
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

  return { createSectionMutation };
};
