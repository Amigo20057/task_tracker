import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router";

export const useCreateBoard = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const createBoardMutation = useMutation({
    mutationFn: async (data: { name: string }) => {
      return await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/boards/create`,
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

  return { createBoardMutation };
};
