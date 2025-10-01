import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router";
import type { IUser } from "~/types/user.interface";

export const useLogin = () => {
  const navigation = useNavigate();

  const loginMutation = useMutation({
    mutationFn: async (data: Pick<IUser, "email" | "password">) => {
      return await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/auth/login`,
        data,
        { withCredentials: true }
      );
    },
    onSuccess: () => {
      navigation("/");
    },
    onError: (error: any) => {
      const serverMessage = error?.response?.data?.message;

      if (
        typeof serverMessage === "string" &&
        serverMessage.includes("NOT_FOUND: User not found")
      ) {
        console.error("Incorrect credentials. Please try again.");
      } else {
        console.error("Something went wrong. Try again later.");
      }
      console.error("Login error:", error);
    },
  });

  return { loginMutation };
};
