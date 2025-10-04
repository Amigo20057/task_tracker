import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router";

export const useDeleteBoard = (boardId: string) => {
  const navigation = useNavigate();
  const queryClient = useQueryClient();
  const deleteBoardMutation = useMutation({
    mutationFn: async () => {
      await axios.delete(
        `${import.meta.env.VITE_SERVER_URL}/boards/delete/${boardId}`,
        {
          withCredentials: true,
        }
      );
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["boards"] });
      navigation("/");
    },
    onError: async (error: any) => {
      console.log(error);
    },
  });

  return { deleteBoardMutation };
};
