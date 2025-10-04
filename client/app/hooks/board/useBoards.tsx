import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { IBoard } from "~/types/task.interface";

interface IProps {
  isAuth: boolean;
}

export const useBoards = ({ isAuth }: IProps) => {
  return useQuery({
    queryKey: ["boards"],
    queryFn: async () => {
      return await axios.get<IBoard[]>(
        `${import.meta.env.VITE_SERVER_URL}/boards`,
        {
          withCredentials: true,
        }
      );
    },
    select: (data) => data.data,
    retry: false,
    enabled: isAuth,
  });
};
