import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { IUser } from "~/types/user.interface";

export const useProfile = () => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      return await axios.get<IUser>(
        `${import.meta.env.VITE_SERVER_URL}/users/profile`,
        {
          withCredentials: true,
        }
      );
    },
    select: (data) => data.data,
    retry: false,
  });
};
