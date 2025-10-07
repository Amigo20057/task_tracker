import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router";

export const useLogout = () => {
  const navigation = useNavigate();
  const queryClient = useQueryClient();

  const logoutMutation = useMutation({
    mutationFn: async () => {
      return await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/auth/logout`,
        {},
        { withCredentials: true }
      );
    },
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ["profile"] });
      queryClient.removeQueries({ queryKey: ["boards"] });
      navigation("/auth/login");
    },
    onError: (error) => {
      console.error("Error logout", error);
    },
  });

  return { logoutMutation };
};
