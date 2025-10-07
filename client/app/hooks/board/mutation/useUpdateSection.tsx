import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import type { ISectionBoard } from "~/types/board.interface";

export const useUpdateSection = (boardId: string, sectionId: string) => {
  const queryClient = useQueryClient();

  const updateSectionMutation = useMutation({
    mutationFn: async (updates: Partial<ISectionBoard>) => {
      return await axios.patch(
        `${import.meta.env.VITE_SERVER_URL}/boards/section/update/`,
        {
          boardId,
          sectionId,
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

  return { updateSectionMutation };
};
