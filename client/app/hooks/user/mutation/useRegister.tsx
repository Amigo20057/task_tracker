import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import type { IUser } from "~/types/user.interface";
import axios from "axios";

export const userRegister = () => {
  const navigation = useNavigate();
  const registerMutation = useMutation({
    mutationFn: async (data: Pick<IUser, "name" | "email" | "password">) => {
      return await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/auth/register`,
        data,
        { withCredentials: true }
      );
    },
    onSuccess: () => {
      navigation("/");
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Unknown error occurred";

      if (typeof message === "string") {
        console.error(message);
      } else {
        console.error("Something went wrong");
      }
    },
  });

  return { registerMutation };
};
